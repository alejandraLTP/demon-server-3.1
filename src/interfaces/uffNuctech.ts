export interface Nuctech {
  UFF: Uff;
}

export interface Uff {
  $: Empty;
  Target: Analysis[];
  Scan: Scan[];
  Analysis: Analysis[];
  RelatedDatasets: string[];
}

export interface Empty {
  "xmlns:xsi": string;
  "xmlns:xsd": string;
  xmlns: string;
}

export interface Analysis {
  EventId: string[];
  Operator: Operator[];
  InspectionSystem: System[];
  Comment: string[];
  TimeStamp: Date[];
  DigSign: string[];
  Assessment?: string[];
  Result?: string[];
  Vehicle?: Vehicle[];
  AdditionalInformation?: AdditionalInformation[];
}

export interface AdditionalInformation {
  Item: Item[];
}

export interface Item {
  Key: string[];
  Value: string[];
}

export interface System {
  Identifier: string[];
  Manufacturer: string[];
  ModelName: string[];
  SerialNumber: string[];
  Country: string[];
}

export interface Operator {
  FirstName: string[];
  LastName: string[];
  LoginName: string[];
  Role: string[];
}

export interface Vehicle {
  Container: Container[];
  FrontPlateNum: string[];
  RearPlateNum: string[];
  VIN: string[];
  Driver: Driver[];
  VehicleType: string[];
}

export interface Container {
  Position: string[];
  ContainerNum: string[];
  NumItem: string[];
  Reason: string[];
  Declaration: Declaration[];
}

export interface Declaration {
  GoodsDescription: string[];
  AdditionnalInformation: string[];
  Consignor: Consignee[];
  Consignee: Consignee[];
  Shipper: Shipper[];
  Owner: Consignee[];
  GroupId: string[];
  CustomsId: string[];
}

export interface Consignee {
  Company: Shipper[];
}

export interface Shipper {
  Name: string[];
  Address: Address[];
}

export interface Address {
  StreetAddress: StreetAddress[];
  City: string[];
  State: string[];
  Country: string[];
  PostalCode: string[];
}

export interface StreetAddress {
  StreetLine: string[];
}

export interface Driver {
  FirstName: string[];
  LastName: string[];
  Address: Address[];
  LicenseNum: string[];
}

export interface Scan {
  EventId: string[];
  ScannerCaseId: string[];
  XraySystem: System[];
  TimeStamp: Date[];
  OCRResult: OCRResult[];
  OutputFile: ScanOutputFile[];
  DigSign: string[];
  XRayFile: XRayFile[];
}

export interface OCRResult {
  OCRType: string[];
  Value: string[];
  Confidence: string[];
  PlateLocation: string[];
  OutputFile: OCRResultOutputFile[];
  TimeStamp: Date[];
  LPRDetail: LPRDetail[];
}

export interface LPRDetail {
  Country: string[];
  State: string[];
}

export interface OCRResultOutputFile {
  URI: string[];
  Hash: string[];
}

export interface ScanOutputFile {
  URI: string[];
  Hash: string[];
  View: string[];
}

export interface XRayFile {
  URI: string[];
  Type: string[];
  Hash: string[];
  View: string[];
  Energy: string[];
  Modality: string[];
  HEMDInfo: HEMDInfo[];
}

export interface HEMDInfo {
  HEMDFileURI: string[];
}
