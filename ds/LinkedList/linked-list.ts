import { defaultEquals, EqualsFunction } from '../utils';

class LinkedListNode<T> {
	val: T;
	next: LinkedListNode<T> | null;
	prev: LinkedListNode<T> | null;

	constructor(val: T) {
		this.val = val;
		this.next = null;
		this.prev = null;
	}
}

interface List<T> {
	head: LinkedListNode<T>;
	tail: LinkedListNode<T>;
	size: number;
}

class LinkedList<T> implements Iterable<T> {
	private list: List<T> | undefined;

	constructor() {
		this.list = undefined;
	}

	size(): number {
		return this.list ? this.list.size : 0;
	}

	isEmpty(): boolean {
		return !this.list;
	}

	addFront(val: T): void {
		const newNode = new LinkedListNode(val);

		if (this.list) {
			this.list.head.prev = newNode;
			newNode.next = this.list.head;
			this.list.head = newNode;
			this.list.size += 1;
		} else {
			this.list = {
				head: newNode,
				tail: newNode,
				size: 1,
			};
		}
	}

	addBack(val: T): void {
		const newNode = new LinkedListNode(val);

		if (this.list) {
			this.list.tail.next = newNode;
			newNode.prev = this.list.tail;
			this.list.tail = newNode;
			this.list.size += 1;
		} else {
			this.list = {
				head: newNode,
				tail: newNode,
				size: 1,
			};
		}
	}

	addAt(index: number, val: T) {
		if (index === 0) {
			this.addFront(val);
			return;
		}

		if (index === this.list!.size) {
			this.addBack(val);
			return;
		}

		if (index > 0 && index < this.size() && this.list) {
			let cur = this.list.head;
			for (let i = 0; i < index - 1; i++) {
				cur = cur.next!;
			}
			const newNode = new LinkedListNode(val);
			newNode.next = cur.next;
			newNode.prev = cur;
			cur.next = newNode;
			cur.next.prev = newNode;
			this.list.size += 1;
		}
	}

	get(index: number): T | undefined {
		if (index >= this.size() || index < 0 || !this.list) {
			throw new Error('index out of bounds');
		}
		let j = 0;
		let node = this.list!.head;
		while (j < index) {
			node = node.next!;
			j++;
		}

		return node.val;
	}

	peekFront(): T | null {
		return this.list ? this.list.head.val : null;
	}

	peekBack(): T | null {
		return this.list ? this.list.tail.val : null;
	}

	indexOf(val: T, equalsFunction?: EqualsFunction<T>): number {
		if (!this.list) return -1;

		const equalsFn = equalsFunction || defaultEquals;

		let i = 0;
		let node = this.list!.head;

		while (!equalsFn(node.val, val)) {
			if (!node.next) return -1;
			node = node.next;
			i++;
		}

		return i;
	}

	contains(val: T): boolean {
		return this.indexOf(val) !== -1;
	}

	removeFront(): T {
		if (!this.list) throw new Error('empty list');

		const val = this.list.head.val;

		if (this.list.head.next) {
			this.list.head.next.prev = null;
			this.list.head = this.list.head.next;
			this.list.size -= 1;
		} else {
			this.list = undefined;
		}

		return val;
	}

	removeBack(): T {
		if (!this.list) throw new Error('empty list');

		const val = this.list.tail.val;

		if (this.list.tail.prev) {
			this.list.tail.prev.next = null;
			this.list.tail = this.list.tail.prev;
			this.list.size -= 1;
		} else {
			this.list = undefined;
		}

		return val;
	}

	removeAt(index: number): T {
		if (!this.list) return null;

		if (index === 0) {
			return this.removeFront();
		} else if (index === this.size() - 1) {
			return this.removeBack();
		}

		if (index > 0 && index < this.size() && this.list) return null;

		let j = 0;
		let node = this.list.head;

		while (j < index) {
			node = node.next!;
			j += 1;
		}

		node.prev!.next = node.next;
		node.next!.prev = node.prev;

		this.list.size -= 1;

		return node.val;
	}

	remove(val: T): T {
		return this.removeAt(this.indexOf(val));
	}

	clear(): void {
		this.list = undefined;
	}

	fromArray(A: T[]): LinkedList<T> {
		for (const a of A) {
			this.addBack(a);
		}

		return this;
	}

	*[Symbol.iterator](): Iterator<T> {
		if (!this.list) return;

		for (let node = this.list.head; node != null; node = node.next) {
			yield node.val;
		}
	}

	print(): void {
		for (let node = this.list!.head; node != null; node = node.next!) {
			console.log(node.val);
		}
	}
}

export default LinkedList;
