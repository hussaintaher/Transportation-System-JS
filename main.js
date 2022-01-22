// Introduction
/*
    Classes Tree:
        1. Vehicle class
            A. Car subclass
            B. Airplain subclass
        2. Employee class
            A. Pilot subclass
            B. Driver subclass
    Idea:
        Car and Airplain subclasses inherts properties from vehicle class.
        Pilot and Driver subclasses inherts properties from Employee class.
        I create 3 instances from Car subclass and 2 from Airplain subclass.
        I create 1 instance from Pilot subclass and 1 from Driver subclass.
        I create function that receives two parameters, one is employee id, 
        second is vehicle id to reserve on vehicle for one employee.
        Finally, I print all reserved vehicles        
*/

//---------------------------------------------------------------------
// Create Classes
class Vehicle {
    static vehicles = [];
    constructor(name, company, id) {
        this.name = name;
        this.company = company;
        this.id = id;
        Vehicle.saveVehicleId(this.id)
    }

    // To push new id's vehicle
    static saveVehicleId = (id) => {
        return Vehicle.vehicles.push(id);
    }

    // is it car or airplain ? 
    static checkTypeOfCar = (vehicleId) => {
        if (vehicleId.includes('C')) {
            return 'Car';
        } else {
            return 'Airplain';
        }
    }

    // To clear the id items in vehicles array
    static removeVehicles = () => {
        return Vehicle.vehicles = [];
    }
}

class Car extends Vehicle {
    constructor(type, engineType, name, company, id){
        super(name, company, id);
        this.type = type;
        this.engineType = engineType;
    }    
}

class Airplane extends Vehicle {
    constructor(type, name, company, id){
        super(name, company, id);
        this.type = type;
    }
}

class Employee {
    constructor(name, dateOfBirth, id) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.id = id;
    }

    // To check whether he is Pilot or Driver
    static handleEmployee = (employeeId) => {
        if (employeeId.includes('LA')) {
            return 'Pilot'
        } else if (employeeId.includes('LB')) {
            return 'Driver';
        }
    }
}

class Pilot extends Employee {
    constructor(licenseID, name, dateOfBirth, id) {
        super(name, dateOfBirth, id)
        this.licenseID = licenseID;
        this.title = 'Pilot';
    }
}

class Driver extends Employee {
    constructor(licenseID ,name, dateOfBirth, id) {
        super(name, dateOfBirth, id)
        this.licenseID = licenseID;
        this.title = 'Driver';
    }
}

class Reserved {
    static reserved = [];
    constructor(props) {
        this.props = props;

        Reserved.allReserveds(this.props)
    }

    // save all reserved vehicles in the reserved array
    static allReserveds = (props) => {
        Reserved.reserved.push(props)
    }
}
//---------------------------------------------------------------------


//---------------------------------------------------------------------
// Create Cars
let car1 = new Car('Camrey', 'gas', 'car', 'toyota', 'C1234');
let car2 = new Car('corola', 'electric', 'car', 'Toyota', 'C1235');
let car3 = new Car('mazda6', 'gas', 'car', 'Mazda', 'C1236');

// Create Airplane
let airplain1 = new Airplane('Tupolev', 'airplane', 'Boeing', 'A1234', 'Tesla')
let airplane2 = new Airplane('Hawker', 'airplane', 'Airbus', 'A1235', 'Tesla')

// save vehicle id in Array;
Vehicle.saveVehicleId();

// Create new employee
let pilot1 = new Pilot('LA123','Ali', '10/07/1997', 'E1234');
let driver1 = new Driver('LB123','Ali', '10/07/1997', 'E1235');
//---------------------------------------------------------------------

//---------------------------------------------------------------------
// Reserve new employee with vehicle 
let reserveVehicle = (employeeId, vehicleId) => {
    // airplaine or car ?
    let vehicle = Vehicle.checkTypeOfCar(vehicleId);
    // pilot or driver ?
    let pilotOrDriver = Employee.handleEmployee(employeeId);
    // if he is pilot and the vehicle is car, he (can not) reserve...
    if (pilotOrDriver === 'Pilot' && vehicle === 'Car') {
        console.log('*************************************************')
        console.log(`Hi, sorry owner of (${employeeId}), You can not reserve`)
        console.log('*************************************************')
    // if he is pilot and the vehicle is Airplain, he (can) reserve...
    } else if (pilotOrDriver === 'Pilot' && vehicle === 'Airplain') {
        // new object for the reserved Vehicle
        let newRes = {
            'employeeId': employeeId,
            'vehicleId': vehicleId,
            'date': Date.now(),
            'id': Math.floor(Math.random() * (2000 - 10) + 10)
        };
        
        // To push the new object in the Reserved Class
        new Reserved(newRes);
        
        // print the list of all reservations
        
        console.log('----------------------------')        
        console.log(Reserved.reserved)
        console.log('----------------------------')
    } else {
        console.log('*************************************************')
        console.log(`Hi, sorry owner of (${employeeId}), You can not reserve`)
        console.log('*************************************************')
    }
}

//---------------------------------------------------------------------
// Run the code
reserveVehicle('LA123','C1236'); // LA means he is pilot, but LB means driver
reserveVehicle('LA123','A1235');
reserveVehicle('LA123','A1236');
reserveVehicle('LB123','C1234');

console.log('//----- ID Numbers of reservations ----------//')
Reserved.reserved.map((item) => {
    console.log('----------------------------')
    console.log('Reservation Num: ', item.id)
    console.log('----------------------------')
})
//---------------------------------------------------------------------