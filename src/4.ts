interface IKey {
  getSignature(): number;
}

interface IPerson {
  getKey(): IKey;
}

abstract class House {
  door: boolean = false;
  key: IKey;
  tenants: IPerson[] = [];

  constructor(key: IKey) {
    this.key = key;
  }

  comeIn = (person: IPerson): void => {
    if (this.door) {
      this.tenants.push(person);
    }
  };

  abstract openDoor(key: IKey): void;
}

class Key implements IKey {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature = (): number => this.signature;
}

class Person implements IPerson {
  constructor(private key: IKey) {}

  getKey = (): IKey => this.key;
}

class MyHouse extends House {
  openDoor = (key: IKey): void => {
    if (this.key?.getSignature() === key.getSignature()) {
      this.door = true;
    }
  };
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
