import LinkedList from '../LinkedList/linked-list';
import { EqualsFunction } from '../utils';

class Queue<T> implements Iterable<T> {
	private list: LinkedList<T>;

	constructor(equalsFn?: EqualsFunction<T>) {
		this.list = equalsFn ? new LinkedList(equalsFn) : new LinkedList();
	}

	size(): number {
		return this.list.size();
	}

	isEmpty(): boolean {
		return this.list.isEmpty();
	}

	clear(): void {
		this.list.clear();
	}

	enqueue(val: T) {
		this.list.addBack(val);
	}

	dequeue(): T {
		return this.list.removeFront();
	}

	peekFront(): T | null {
		return this.list.peekFront();
	}

	peekBack(): T | null {
		return this.list.peekBack();
	}

	contains(val: T): boolean {
		return this.list.contains(val);
	}

	[Symbol.iterator](): Iterator<T> {
		return this.list[Symbol.iterator]();
	}
}

export default Queue;
