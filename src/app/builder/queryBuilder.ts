import { FilterQuery, Query } from "mongoose";

class queryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, Query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = Query;
  }

//   // search method
//   search(searchableFields: string[]) {
//     // console.log(searchableFields);

//     const searchTerm = this?.query?.searchTerm;
//     if (searchTerm) {
//       this.modelQuery = this?.modelQuery?.find({
//         $or: searchableFields.map(
//           (field) =>
//             ({
//               [field]: { $regex: searchTerm, $options: "i" },
//             }) as FilterQuery<T>
//         ),
//       });
//     }
//     return this;
//   }

search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm;
  
    if (searchTerm) {
 
      const stringFields = searchableFields.filter(field => {
        
        return ['title', 'description', "userName" ].includes(field); // Example of known string fields
      });
  
      if (stringFields.length > 0) {
        this.modelQuery = this.modelQuery.find({
          $or: stringFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' },
          })),
        });
      }
    }
  
    return this;
  }
  


  // fillter method
  fillter() {
    const copyQuair = { ...this?.query };
    const excludeField = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeField.forEach((el) => delete copyQuair[el]);
    this.modelQuery = this?.modelQuery?.find(copyQuair as FilterQuery<T>);
    return this;
  }
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createAt";
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }
  //pagination method

  pagenate() {
    const page = Number(this?.query?.page);
    const limit = Number(this?.query?.limit);
    const skip = (page - 1) * limit;
    this.modelQuery = this?.modelQuery?.skip(skip).limit(limit);
    return this;
  }
  //   fields method
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default queryBuilder;


