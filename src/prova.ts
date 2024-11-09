import { NS } from '@ns';

export async function main(ns: NS) {
	ns.args.forEach((arg) => ns.tprint(arg));

}