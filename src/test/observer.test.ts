import Observer from '../slider/Observer/Observer';

interface valueForBroadcast {
  value: number | unknown;
  type?: string;
}

class ClassA {
  testA: number;

  update({ value, type }: valueForBroadcast): void {
    if (type === 'test') {
      this.testA = value as number;
    }
  }
}

class ClassB {
  classA: ClassA;

  observer: Observer;

  constructor() {
    this.classA = new ClassA();
    this.observer = new Observer();
  }
}

const classB: ClassB = new ClassB();

describe('Observer', () => {
  beforeEach(() => {
    spyOn(classB.classA, 'update');
  });

  it('ф-я broadcast передает данные всем подписчикам', () => {
    classB.observer.subscribe(({ value, type }: valueForBroadcast) => {
      classB.classA.update({ value, type } as valueForBroadcast);
    });

    classB.observer.broadcast({ value: 10, type: 'test' });

    expect(classB.classA.update).toHaveBeenCalledWith({ value: 10, type: 'test' });
  });
});
