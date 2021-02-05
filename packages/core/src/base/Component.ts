/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseObject from './BaseObject';
import Behavior, { EventType } from './Behavior';
class Component extends BaseObject {
    private _events;
    private _eventWildcards = [];
    private _behaviors;
    behaviors(): Array<Record<string, any>> {
        return [];
    }
    ensureBehaviors(): void {
        if (this._behaviors === null) {
            this._behaviors = [];
            const behaviors = this.behaviors();
            for (const name in behaviors) {
                this.attachBehaviorInternal(name, behaviors[name]);
            }
        }
    }
    on(name: string, handler: [Behavior, EventType] | EventType, data = null, append = true): void {}
    public off(name: string, handler: [Behavior, EventType] | EventType | null = null) {}
    private attachBehaviorInternal(name: string, behavior: Record<string, any>) {
        /*
        if (!($behavior instanceof Behavior)) {
            $behavior = Yii::createObject($behavior);
        }
        if (is_int($name)) {
            $behavior->attach($this);
            $this->_behaviors[] = $behavior;
        } else {
            if (isset($this->_behaviors[$name])) {
                $this->_behaviors[$name]->detach();
            }
            $behavior->attach($this);
            $this->_behaviors[$name] = $behavior;
        }

        return $behavior;
        */
    }
}
export default Component;
