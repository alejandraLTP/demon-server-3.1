export interface EventUff {
  UFF: UFF[];
}

interface UFF {
  Target?: Target[];
  Scan?: Scan[];
  Analysis?: Analysis[];
  RelatedDatasets?: any[];
}

interface Target {
  EventId?: string[];
  InspectionSystem?: InspectionSystem[];
  TimeStamp?: string[]; // ISO 8601
  Vehicle?: Vehicle[];
}

interface InspectionSystem {
  Identifier?: string[];
  Manufacturer?: string[];
  ModelName?: string[];
  SerialNumber?: string[];
  Country?: string[];
  Location?: Location[];
}

interface Location {
  Latitude?: number[];
  Longitude?: number[];
}

interface Vehicle {
  Container?: {
    ContainerNum?: string;
  };
  FrontPlateNum?: string;
  RearPlateNum?: string;
  VehicleType?: string; // Ej. "Truck", "Car"
  EventId?: String;
}

interface Scan {
  EventId?: string[];
  ScannerCaseId?: string[];
  XraySystem?: XraySystem[];
  TimeStamp?: string[]; // ISO 8601
  OCRResult?: OCRResult[];
  DigSign?: string[];
  OutputFile?: OutputFile[];
  XRayFile?: XRayFile[];
}

interface XraySystem extends InspectionSystem {}

interface OCRResult {
  OCRType?: string[]; // Ej. "OCR"
  Value?: string[];
  Confidence?: string[];
  PlateLocation?: string[];
  TimeStamp?: string[]; // ISO 8601
  LPRDetail?: LPRDetail[];
}

interface LPRDetail {
  Country?: string[];
  State?: string[];
}

export interface OutputFile {
  URI?: string[];
  Type?: string[]; // Ej. "Snapshot"
  View?: string[]; // Ej. "Left"
}

interface XRayFile extends OutputFile {
  Energy?: number[]; // Ej. 60, 30
  Modality?: string[]; // Ej. "Transmission"
  HEMDInfo?: HEMDInfo[];
}

interface HEMDInfo {
  HEMDFileURI?: string[];
}

interface Analysis {
  EventId?: string[];
  Operator?: Operator[];
  InspectionSystem?: InspectionSystem[];
  Comment?: string[];
  TimeStamp?: string[]; // ISO 8601
  DigSign?: string[];
  Assessment?: string[];
  Result?: string[];
}

interface Operator {
  FirstName?: string[];
  LastName?: string[];
  LoginName?: string[];
  Role?: string[]; // Ej. "check"
}

//  XRayFile
export interface XRayFileData {
  URI: string[];
  Type: string[];
  View: string[];
  Modality: string[];
  Energy?: string[];
  HEMDInfo?: HEMDInfo[];
}
