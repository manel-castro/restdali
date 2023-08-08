export interface InitialField {
  fieldId: string;
  fieldType: string;
  fieldLabel: string;
  fieldValue: string;
  createdAt: string;
  updatedAt: string;
  sectionId: string;
  lang: string;
}

export interface CMSData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  initialFields: InitialField[];
}
