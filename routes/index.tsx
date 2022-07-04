/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { nanoid } from "https://deno.land/x/nanoid/mod.ts";

const JUNKDIR = "./junkdir/";

interface Data {
  filename: string,
  content: string
}

// Handling inputting data
// Doing this in Fresh is a bit difficult, but not too frstrating
export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const filename = url.searchParams.get("filename") || nanoid(10) + ".txt";
    const content = url.searchParams.get("content") || "Nothing here";
    await Deno.writeTextFile(JUNKDIR + filename, content);
    console.log(`Content written successful to file ${filename}`);
    return ctx.render({ filename, content });
  }
};

export default function Home({ data }: PageProps<Data>) {
  const { filename, content } = data;
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <h1 class={tw`text-xl font-medium`}>
        <a class={tw`text-purple-600`} href="/">Petunia</a> -
        Dead simple pastebin hosting service
      </h1>
      <form>
        <input type="text" placeholder="File name" required value={filename}
          name="filename"
          class={tw`w-max h-10 mb-4 border-4`}/> 
        <hr class={tw`mb-4`}/>
        <textarea
          id="content"
          cols="30"
          rows="10"
          class={tw`border-4 bg-gray`}
          value={content}
          name="content"
        ></textarea>
        <br class={tw`mb-4`} /> 
        <button type="submit"
          class={tw`h-10 px-6 font-semibold rounded-lg bg-black text-white`}>
          Paste!
        </button>
      </form>
    </div>
  );
}
