import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET(req, res) {
  // 指定要读取的文件夹路径
  const folderPath = path.join(
    process.cwd(),
    "src/app/content",
    "node_20231031.mdx"
  );
  const mdxContent = fs.readFileSync(folderPath, "utf8");

  return new Response(JSON.stringify({ content: mdxContent }), {
    status: 200,
  });
}
