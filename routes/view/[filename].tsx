/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";

const JUNKDIR = "./junkdir/";

export default function DisplayFile(props: PageProps) {
  const { filename } = props.params;
  const text = Deno.readTextFileSync(JUNKDIR + filename);
  return <pre>{text}</pre>;
}
