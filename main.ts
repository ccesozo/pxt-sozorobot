/* /**
* extended blocks for sozoRobot
*/

enum CarDirection {
    //% block="forward" enumval=0
    CarForward,
    //% block="back" enumval=1
    CarBackward,
    //% block="turn right" enumval=2
    CarTurnRight,
    //% block="turn left" enumval=3
    CarTurnLeft
}

//% weight=112 color=#00A654 icon="\uf1b9" block="sozoRobot"

namespace sozoRobot {
    let leftMoterPin = AnalogPin.P1
    let rightMoterPin = AnalogPin.P2
    let leftMoterPowerSet = 20
    let rightMoterPowerSet = 20

    /**
    * initialization sozorobot car
    * @param left describe parameter here, eg: AnalogPin.P1
    * @param right describe parameter here, eg: AnalogPin.P2
    */

    //% blockId=custom_init block="set left wheel pin %leftPin|right wheel pin %rightPin"
    export function initWheel(leftPin: AnalogPin, rightPin: AnalogPin): void {
        leftMoterPin = leftPin
        rightMoterPin = rightPin
    }

    /**
    * initialization wheel speed
    * @param leftSpeed describe parameter from 0(min) to 100(max) here, eg: 15
    * @param rightSpeed describe parameter from 0(min) to 100(max) here, eg: 15
    */
    //% blockId=CCE_hamabit_servos_speed
    //% block="set left wheel speed %leftSpeed| right wheel speed %rightSpeed"
    //% leftSpeed.min=0 leftSpeed.max=100
    //% rightSpeed.min=0 rightSpeed.max=100
    //% leftSpeed.defl=20
    //% rightSpeed.defl=20
    export function initSpeed(leftSpeed: number, rightSpeed: number): void {
        leftMoterPowerSet = leftSpeed
        rightMoterPowerSet = rightSpeed
    }

    /**
    * Drives forwards. Call stop to stop
    */
    //% blockId=CCE_hamabit_servos_forward
    // block="drive forward"
    export function forward(powerCoefficient: number): void {
        let leftMoterPower = 9 * leftMoterPowerSet * (powerCoefficient / 100) + 1500
        let rightMoterPower = -9 * rightMoterPowerSet * (powerCoefficient / 100) + 1500
        if (leftMoterPower > 2400) {
            leftMoterPower = 2400
        }
        if (rightMoterPower < 600) {
            rightMoterPower = 600
        }
        pins.servoSetPulse(leftMoterPin, leftMoterPower)
        pins.servoSetPulse(rightMoterPin, rightMoterPower)
    }

    /**
    * Drives backwards. Call stop to stop
    */
    //% blockId=CCE_hamabit_servos_backward
    // block="drive backward"
    export function backward(powerCoefficient: number): void {
        let leftMoterPower = -9 * leftMoterPowerSet * (powerCoefficient / 100) + 1500
        let rightMoterPower = 9 * rightMoterPowerSet * (powerCoefficient / 100) + 1500
        if (leftMoterPower < 600) {
            leftMoterPower = 600
        }
        if (rightMoterPower > 2400) {
            rightMoterPower = 2400
        }
        pins.servoSetPulse(leftMoterPin, leftMoterPower)
        pins.servoSetPulse(rightMoterPin, rightMoterPower)
    }

    /**
    * Turns left. Call stop to stop
    */
    //% blockId=CCE_hamabit_servos_left
    // block="turn left"
    export function left(powerCoefficient: number): void {
        let leftMoterPower = -9 * leftMoterPowerSet * (powerCoefficient / 100) + 1500
        let rightMoterPower = -9 * rightMoterPowerSet * (powerCoefficient / 100) + 1500
        if (leftMoterPower < 600) {
            leftMoterPower = 600
        }
        if (rightMoterPower < 600) {
            rightMoterPower = 600
        }
        pins.servoSetPulse(leftMoterPin, leftMoterPower)
        pins.servoSetPulse(rightMoterPin, rightMoterPower)
    }

    /**
    * Turns right. Call stop to stop
    */
    //% blockId=CCE_hamabit_servos_right
    // block="turn right"
    export function right(powerCoefficient: number): void {
        let leftMoterPower = 9 * leftMoterPowerSet * (powerCoefficient / 100) + 1500
        let rightMoterPower = 9 * rightMoterPowerSet * (powerCoefficient / 100) + 1500
        if (leftMoterPower > 2400) {
            leftMoterPower = 2400
        }
        if (rightMoterPower > 2400) {
            rightMoterPower = 2400
        }
        pins.servoSetPulse(leftMoterPin, leftMoterPower)
        pins.servoSetPulse(rightMoterPin, rightMoterPower)
    }

    /**
    * Drives forwards for requested time and then stops
    * @param duration describe forwarding time in millisecond, eg:500
    */
    //% blockId=CCE_hamabit_drive_forwards
    //% block="drive forward（ms） %duration"
    //% duration.shadow=timePicker
    //% duration.defl=1000
    export function driveForwards(duration: number): void {
        forward(100);
        basic.pause(duration);
        stop();
    }

    /**
    * Drives backwards for requested time and then stops
    * @param duration describe backwarding time in millisecond, eg:500
    */
    //% blockID=CCE_hamabit_drive_backwards
    //% block="drive backward（ms） %duration"
    //% duration.shadow=timePicker
    //% duration.defl=1000
    export function driveBackwards(duration: number): void {
        backward(100);
        basic.pause(duration);
        stop();
    }

    /**
    * Move turn right for requested time and then stops
    * @param duration describe turning time in millisecond, eg:500
    */
    //% blockID=CCE_hamabit_drive_rightturns
    //% block="turn right（ms） %duration"
    //% duration.shadow=timePicker
    //% duration.defl=1000
    export function turnRight(duration: number): void {
        right(100);
        basic.pause(duration);
        stop();
    }

    /**
    * Move turn left for requested time and then stops
    * @param duration describe turning time in millisecond, eg:500
    */
    //% blockID=CCE_hamabit_drive_leftturns
    //% block="turn left（ms） %duration"
    //% duration.shadow=timePicker
    //% duration.defl=1000
    export function turnLeft(duration: number): void {
        left(100);
        basic.pause(duration);
        stop();
    }

    /**
     * Run a car continuously
     * @param describe directon to turn the car in, eg: CarDirection.CarForward
     */
    //% blockID=CCE_hamabit_drive_continuous
    //% block="continuous drive | %direction"
    // expandableArgumentMode="toggle"
    export function continuousRun(direction: CarDirection) {
        switch (direction) {
            case CarDirection.CarForward:
                forward(100);
                break
            case CarDirection.CarBackward:
                backward(100);
                break
            case CarDirection.CarTurnRight:
                right(100);
                break
            case CarDirection.CarTurnLeft:
                left(100);
                break
            default:
                stop();
        }
    }

    /**
    * stop
    */
    //% blockID=CCE_hamabit_drive_stop
    //% block="stop"
    export function stop(): void {
        pins.digitalWritePin(<number>leftMoterPin, 0)
        pins.digitalWritePin(<number>rightMoterPin, 0)
    }

    /**
    * Forwards through the requested time and power then stops
    * @param duration in milliseconds to run the car, eg:500
    * @param powerAdjustment the factor of servo power adj　from 0 (min) to 200 (max), eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_forward
    //% block="drive forward（ms） %duration| power（％） %powerAdjustment"
    //% duration.shadow=timePicker
    //% powerAdjustment.min=0 powerAdjustment.max=200
    //% duration.defl=1000
    //% powerAdjustment.defl=80
    export function customForwards(duration: number, powerAdjustment: number): void {
        forward(powerAdjustment);
        basic.pause(duration);
        stop();
    }

    /**
    * Backwards through the requested time and power then stops
    * @param duration in milliseconds to run the car, eg:500
    * @param powerAdjustment the factor of servo power adj　from 0 (min) to 200 (max), eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_backward
    //% block="drive backward（ms） %duration| power（％） %powerAdjustmen"
    //% duration.shadow=timePicker
    //% powerAdjustment.min=0 powerAdjustment.max=200
    //% duration.defl=1000
    //% powerAdjustment.defl=80
    export function customBackwards(duration: number, powerAdjustment: number): void {
        backward(powerAdjustment);
        basic.pause(duration);
        stop();
    }

    /**
    * Turn right through the requested time and power then stops
    * @param duration in milliseconds to run the car, eg:500
    * @param powerAdjustment the factor of servo power adj　from 0 (min) to 200 (max), eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_rightTurn
    //% block="turn right（ms） %duration| power （％） %powerAdjustment"
    //% duration.shadow=timePicker
    //% powerAdjustment.min=0 powerAdjustment.max=200
    //% duration.defl=1000
    //% powerAdjustment.defl=80
    export function customRight(duration: number, powerAdjustment: number): void {
        right(powerAdjustment);
        basic.pause(duration);
        stop();
    }

    /**
    * Turn left through the requested time and power then stops
    * @param duration in milliseconds to run the car, eg:500
    * @param powerAdjustment the factor of servo power adj　from 0 (min) to 200 (max), eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_leftTurn
    //% block="turn left（ms） %duration| power（％） %powerAdjustment"
    //% duration.shadow=timePicker
    //% powerAdjustment.min=0 powerAdjustment.max=200
    //% duration.defl=1000
    //% powerAdjustment.defl=80
    export function customLeft(duration: number, powerAdjustment: number): void {
        left(powerAdjustment);
        basic.pause(duration);
        stop();
    }

}

