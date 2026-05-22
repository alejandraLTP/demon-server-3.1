import xml2js from "xml2js";

export const parseXML = async (xml: string): Promise<any> => {
  const parser = new xml2js.Parser();
  return parser.parseStringPromise(xml);
};
