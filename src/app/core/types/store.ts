import {Observable, BehaviorSubject} from 'rxjs';

export class Store<T> {
    state$: Observable<T>;
    private _state$: BehaviorSubject<T>;

    constructor(initialState: T) {
        this._state$ = new BehaviorSubject(initialState);
        this.state$ = this._state$.asObservable();
    }

    get state(): T {
        return this._state$.getValue();
    }

    setState(nextState: T) {
        this._state$.next(nextState);
    }

    // prettier-ignore
    updateState<
        S extends T,
        V extends NonNullable<S>[P1],
        P1 extends keyof NonNullable<S>
    >(value: V, part1: P1): void;
    // prettier-ignore
    updateState<
        S extends T,
        V extends NonNullable<NonNullable<S>[P1]>[P2],
        P1 extends keyof NonNullable<S>,
        P2 extends keyof NonNullable<NonNullable<S>[P1]>
    >(value: V, part1: P1, part2: P2): void;
    // prettier-ignore
    updateState<
        S extends T,
        V extends NonNullable<NonNullable<NonNullable<S>[P1]>[P2]>[P3],
        P1 extends keyof NonNullable<S>,
        P2 extends keyof NonNullable<NonNullable<S>[P1]>,
        P3 extends keyof NonNullable<NonNullable<NonNullable<S>[P1]>[P2]>
    >(value: V, part1: P1, part2: P2, part3: P3): void;
    // prettier-ignore
    updateState<
        S extends T,
        V extends NonNullable<NonNullable<NonNullable<NonNullable<S>[P1]>[P2]>[P3]>[P4],
        P1 extends keyof NonNullable<S>,
        P2 extends keyof NonNullable<NonNullable<S>[P1]>,
        P3 extends keyof NonNullable<NonNullable<NonNullable<S>[P1]>[P2]>,
        P4 extends keyof NonNullable<NonNullable<NonNullable<NonNullable<S>[P1]>[P2]>[P3]>
    >(value: V, part1: P1, part2: P2, part3: P3, part4: P4): void;
    // prettier-ignore

    updateState(value: any, ...path: string[]) {
        if (path.length < 1) {
            return;
        }
        this.setState(this.getUpdatedState(value, this.state, path));
    }

    private getUpdatedState(
        value: any,
        stateSubtree: any,
        path: string[]
    ): any {
        const key = path[0];
        if (path.length === 1) {
            return {
                ...stateSubtree,
                [key]: value,
            };
        }
        if (stateSubtree[key] === undefined) {
            return {
                ...stateSubtree,
                [key]: this.createStateSubtree(value, path.slice(1)),
            };
        }
        return {
            ...stateSubtree,
            [key]: this.getUpdatedState(
                value,
                stateSubtree[key],
                path.slice(1)
            ),
        };
    }

    private createStateSubtree(value: any, path: string[]): any {
        const key = path[0];
        if (path.length === 1) {
            return {
                [key]: value,
            };
        }
        return {
            [key]: this.createStateSubtree(value, path.slice(1)),
        };
    }
}
