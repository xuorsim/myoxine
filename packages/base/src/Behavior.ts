import BaseObject from './BaseObject';
import Component from './Component';

export type EventType = any;
export type EventsType = Record<string, EventType>;

class Behavior extends BaseObject {
    public owner?: Component;

    private _attachedEvents: EventsType = [];
    public events(): EventsType {
        return [];
    }
    public attach(owner: Component): void {
        this.owner = owner;
        const events = this.events();
        for (const event_key in events) {
            const handler = events[event_key];
            this._attachedEvents[event_key] = handler;
            owner.on(event_key, typeof handler === 'string' ? [this, handler] : handler);
        }
        /*
        foreach ($this->events() as $event => $handler) {
            $this->_attachedEvents[$event] = $handler;
            $owner->on($event, is_string($handler) ? [$this, $handler] : $handler);
        }
        */
    }
    public detach(): void {
        if (this.owner) {
            for (const event_key in this._attachedEvents) {
                const handler = this._attachedEvents[event_key];
                this.owner.off(event_key, typeof handler === 'string' ? [this, handler] : handler);
            }
            this._attachedEvents = [];
            this.owner = undefined;
            /*
            foreach ($this->_attachedEvents as $event => $handler) {
                $this->owner->off($event, is_string($handler) ? [$this, $handler] : $handler);
            }
            */
        }
    }
}
export default Behavior;
