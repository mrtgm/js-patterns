class Person {
  set name(name) {
    if (this._name == name) return;
    this.notifyObserver("name", this._name, name);
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set age(age) {
    if (this._age == age) return;
    this.notifyObserver("age", this._age, age);
    this._age = age;
  }

  get age() {
    return this._age;
  }

  set job(job) {
    if (this._job == job) return;
    this.notifyObserver("job", this._job, job);
    this._job = job;
  }

  get job() {
    return this._job;
  }

  category = "";

  observers = [];

  constructor(_name, _age, _job) {
      this._name = _name;
      this._age = _age;
      this._job = _job;
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObserver(propertyName, oldValue, newValue) {
    for (const observer of this.observers) {
      observer.apply(this, [propertyName, oldValue, newValue]);
    }
  }

  toJson() {
    const ret = {
      name: this.name,
      age: this.age,
      job: this.job,
    };
    return JSON.stringify(ret);
  }
}

class Main {
  constructor() {
    let taro = new Person("yamada taro", 25, "teacher");
    taro.addObserver((propertyName, oldValue, newValue) => {
      this.dump(taro, propertyName, oldValue, newValue);
    });

    taro.age = 30;
  }

  dump(person, propertyName, oldValue, newValue) {
    console.log(person.name, propertyName, oldValue, newValue);
  }
}

new Main();
