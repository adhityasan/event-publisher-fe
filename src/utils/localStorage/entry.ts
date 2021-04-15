import { isUndefinedNull, isObject } from '../helpers';

interface LocalStorageEntryProps {
  key: string;
  defaultValue: any;
  type?: LocalStorageTypes;
}

class LocalStorageEntry {
  key: string;
  defaultValue: any;
  type: LocalStorageTypes;

  constructor(props: LocalStorageEntryProps) {
    const { key = 'dump', defaultValue = null, type } = props;
    this.key = key;
    this.defaultValue = defaultValue;
    this.type = type || typeof defaultValue;
  }

  isValid(value: unknown): boolean {
    const nvalue = value || this.defaultValue;
    return typeof nvalue === this.type;
  }

  isExist(): boolean {
    return !isUndefinedNull(window.localStorage.getItem(this.key));
  }

  init(data?: unknown): void {
    try {
      // check if already exist
      let ndata = data || this.defaultValue;
      if (window.localStorage.getItem(this.key)) {
        throw new Error(`localStorage.${this.key} already has initialized`);
      }
      // check is passed data valid
      if (!this.isValid(ndata)) {
        throw new Error(`localstorage.${this.key} type must be ${this.type}`);
      }
      // if it's an object stringify data & add iat (init at) as a time marker
      if (isObject(ndata)) {
        const timemarkData = { ...ndata, iat: new Date().getTime() };
        ndata = JSON.stringify(timemarkData);
      }
      window.localStorage.setItem(this.key, ndata);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  set(data: unknown): void {
    try {
      // check is initialized
      if (!this.isExist()) {
        throw new Error(`localstorage.${this.key} is not initialized`);
      }
      // check is passed value valid
      if (!this.isValid(data)) {
        throw new Error(`localstorage.${this.key} type must be ${this.type}`);
      }
      // stringify data if it's an object
      const ndata: string = isObject(data) ? JSON.stringify(data) : String(data);
      window.localStorage.setItem(this.key, ndata);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  get(): any {
    const storageItem = String(window.localStorage.getItem(this.key));
    return this.type === 'object' ? JSON.parse(storageItem) : storageItem;
  }

  remove(): void {
    window.localStorage.removeItem(this.key);
  }
}

export default LocalStorageEntry;
