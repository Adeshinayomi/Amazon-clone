class Car{
  brand;
  model;
  speed;
  isTrunkOpen;
  constructor(car){
    this.brand=car.brand
    this.model=car.model
    this.speed=car.speed
   if(car.isTrunkOpen){
    this.isTrunkOpen='open'
   }else{
    this.isTrunkOpen='close'
   }
  }
  displayInfo(){
    return`${this.brand}, ${this.model}, ${this.speed}km/hr, Trunk:${this.isTrunkOpen}`
  }
  go(){
    if(this.speed < 200 && this.isTrunkOpen === 'close'){
      this.speed+=5
    }
    
  }
  brake(){
    if(this.speed > 0){
     this.speed-=5
    }
  }
  openTrunk(){
    if(this.speed = 0){
      this.isTrunkOpen='open'
    }else{
      this.isTrunkOpen='close'
    }
   
  }
  closeTrunk(){
    this.isTrunkOpen='close'
  }
}
class RaceCar extends Car{
  acceleration;
  constructor(car){
    super(car)
    this.acceleration=car.acceleration
  }
  displayInfo(){
    return`${this.brand}, ${this.model}, ${this.speed}km/hr`
  }
  go(){
    if(this.speed < 300){
      this.speed+=this.acceleration
    }
  }
}
const firstCar=new Car({
  brand:'toyota',
  model:'corolla',
  speed:0,
  isTrunkOpen:false
})
const secondCar=new Car({
  brand:'tesla',
  model:'model 3',
  speed:0,
  isTrunkOpen:false
})

const sportCar=new RaceCar({
  brand:'McLaren',
  model:'F1',
  speed:0,
  acceleration:20
})


secondCar.go()
secondCar.go()

console.log(firstCar.displayInfo());
console.log(secondCar.displayInfo())
sportCar.go()
console.log(sportCar.displayInfo())