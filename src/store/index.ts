import { makeAutoObservable, runInAction } from "mobx";

export const store = new (class Store {
  static instance: Store;

  mediaSource = "https://api.thecatapi.com/v1/images/search";

  loading = false;
  currentIndex = -1;
  media = [];

  get state() {
    const { current, currentIndex, loading, media } = this;

    return {
      loading,
      current,
      currentIndex,
      count: media.length,
      number: currentIndex + 1
    };
  }

  get current() {
    return this.media[this.currentIndex];
  }

  constructor() {
    makeAutoObservable(this);
  }

  async loadNext(limit = 10) {
    this.loading = true;

    const media = await fetch(this.mediaSource + `?limit=${limit}`)
      .then((res) => res.json())
      .catch((err) => []);

    const prevLength = this.media.length;

    runInAction(() => {
      this.media.push(...media);
    });

    this.setIndex(prevLength);

    runInAction(() => {
      this.loading = false;
    });

    return true;
  }

  move(direction: number) {
    if (direction < 0) {
      this.previous();
    } else if (direction > 0) {
      this.next();
    }
  }

  next() {
    const { currentIndex, media } = this;

    if (!media.length) {
      return (this.currentIndex = 0);
    }

    const nextIndex = currentIndex + 1;

    this.setIndex(nextIndex % media.length || 0);
  }

  previous() {
    const { currentIndex, media } = this;

    if (!media.length) {
      return (this.currentIndex = 0);
    }

    const nextIndex = currentIndex - 1;

    this.setIndex(nextIndex < 0 ? media.length - 1 : nextIndex);
  }

  setIndex(index) {
    this.currentIndex = index;
  }
})();
