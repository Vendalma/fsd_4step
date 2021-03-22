import Observer from '../slider/Observer/Observer';

type valueForBroadcast = {
  value: number;
  type: string;
};

class ClassA {
  testA: number;

  update({ value, type }: valueForBroadcast): void {
    if (type === 'test') {
      this.testA = value;
    }
  }
}

class ClassB {
  classA: ClassA;

  observer: Observer<valueForBroadcast>;

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
      classB.classA.update({ value, type });
    });

    classB.observer.broadcast({ value: 10, type: 'test' });

    expect(classB.classA.update).toHaveBeenCalledWith({ value: 10, type: 'test' });
  });
});
