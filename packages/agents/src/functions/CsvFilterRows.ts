import { ScriptFunction } from "../scriptedAgents/ScriptFunction"

export class CsvFilterRowsFunction extends ScriptFunction<{ csvData: string, columnIndex: number, searchString: string, withHeader: boolean }> {
  name: string = "csv_filterRows";
  parameters: any = {
    type: "object",
    properties: { 
      csvData: {
        type: "string"
      },
      columnIndex: {
        type: "number"
      },
      searchString: {
        type: "string"
      },
      withHeader: {
        type: "boolean"
      },
      outputFile: {
          type: "string",
          description: "Write the result to a file"
      }
    },
    required: ["csvData", "columnIndex", "searchString", "withHeader"],
    additionalProperties: false
  };
}
