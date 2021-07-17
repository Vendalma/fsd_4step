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
    classB.observer.subscribe(classB.classA.update);

    classB.observer.broadcast({ value: 10, type: 'test' });

    expect(classB.classA.update).toHaveBeenCalledWith({
      value: 10,
      type: 'test',
    });
  });

  it('ф-я unsubscribe отписывает от обновлений', () => {
    classB.observer.subscribe(classB.classA.update);
    classB.observer.unsubscribe(classB.classA.update);

    classB.observer.broadcast({ value: 10, type: 'test' });

    expect(classB.classA.update).not.toHaveBeenCalledWith({
      value: 10,
      type: 'test',
    });
  });
});
