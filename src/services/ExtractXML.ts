import fs from "fs-extra";
import unzipper from "unzipper";
import path from "path";

export const extractUFF = async (
  filePath: string,
  destinationPath: string,
): Promise<string | null> => {
  await fs
    .createReadStream(filePath)
    .pipe(unzipper.Extract({ path: destinationPath }))
    .promise();

  const getAllFiles = async (dir: string): Promise<string[]> => {
    const dirents = await fs.readdir(dir, { withFileTypes: true });

    const files = await Promise.all(
      dirents.map((dirent) => {
        const res = path.join(dir, dirent.name);
        return dirent.isDirectory() ? getAllFiles(res) : Promise.resolve([res]);
      }),
    );

    return files.flat();
  };

  const allFiles = await getAllFiles(destinationPath);

  for (const file of allFiles) {
    if (file.toLowerCase().endsWith(".xml")) {
      return await fs.readFile(file, "utf-8");
    }
  }

  return null;
};