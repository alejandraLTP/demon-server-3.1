
export enum Entities {
  users = "users",
  vehicles = "vehicles",
  containers = "containers",
  wagons = "wagons",
  alarms = "alarms",
  analysisEvents = "analysisEvents",
  annotations = "annotations",
  audits = "audits",
  declarations = "declarations",
  drivers = "drivers",
  events = "events",
  vehiclesTypes = "vehiclesTypes",
  horarios = "horarios",
  operationAreas = "operationAreas",
  customSection = "customSection",
  sitios = "sitios",
  equipos = "equipos",
  regions = "regions",
  custom = "customs",
  file = "file",
  inspectionSystem = "inspectionSystem",
  ocrResults = "ocrResults",
  operator = "operator",
  targetEvents = "targetEvents",
  uff = "uff",
  scan = "scan",
  scanEvents = "scanEvents",
  status = "status",
  blacklist = "blacklist",
  xrayFiles = "xrayFiles",
  imageEdits = "imageEdits",
}

export enum OperationAudits {
    create = 'CREATE',
    update = 'UPDATE',
    delete = 'DELETE',
    login = 'LOGIN'
}

export enum Fuentes {
  CBP = "CBP",
  DGPEDA = "DGPEDA",
  DEFINIR = "POR DEFINIR",
}