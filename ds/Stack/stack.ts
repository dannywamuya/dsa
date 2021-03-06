import LinkedList from '../LinkedList/linked-list';
import { EqualsFunction } from '../utils';

class Stack<T> implements Iterable<T> {
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

	push(val: T) {
		this.list.addBack(val);
	}

	pop(): T {
		return this.list.removeBack();
	}

	peek(): T | null {
		return this.list.peekBack();
	}

	contains(val: T): boolean {
		return this.list.contains(val);
	}

	[Symbol.iterator](): Iterator<T> {
		return this.list[Symbol.iterator]();
	}
}

export default Stack;
