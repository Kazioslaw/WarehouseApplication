import { LabelDocument } from './label-document';

export interface Label {
  labelID?: number;
  labelName: string;
  labelDocuments?: LabelDocument[];
}
