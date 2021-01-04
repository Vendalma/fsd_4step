import Observer from '../slider/Observer/Observer';

class ClassA {
  testA: { [key: string]: number };

  update(data: { [key: string]: number }, type: string) {
    this.testA = data;
  }
}
class ClassB {
  classA: ClassA;

  observer: Observer;

  constructor() {
    this.classA = new ClassA();
    this.observer = new Observer();
    this.observer.subscribe(this.classA);
  }
}
const classB: ClassB = new ClassB();
describe('Observer', () => {
  it('ф-я broadcast передает данные всем подписчикам', () => {
    spyOn(classB.classA, 'update');
    classB.observer.broadcast({ a: 1 }, 'data');

    expect(classB.classA.update).toHaveBeenCalledWith({ a: 1 }, 'data');
  });

  it('ф-я unsubscribe удаляет класс из списка подписчиков', () => {
    classB.observer.unsubscribe(classB.classA);
    spyOn(classB.classA, 'update');
    classB.observer.broadcast({ a: 1 }, 'data');

    expect(classB.classA.update).not.toHaveBeenCalledWith({ a: 1 }, 'data');
  });
});
