import mongoose from "mongoose";

function buildQuery(query) {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    fields,
    search,
    searchField = "_id",
    ...rest
  } = query;

  const sort = `${sortOrder === "desc" ? "-" : ""}${sortBy}`;
  const filter = {};

  if (search && searchField) {
    const fields = searchField.split(",");
    const orConditions = [];
    for (const field of fields) {
      if (field === "_id") {
        if (mongoose.Types.ObjectId.isValid(search)) {
          orConditions.push({ _id: new mongoose.Types.ObjectId(search) });
        }
        orConditions.push({
          $expr: {
            $regexMatch: {
              input: { $toString: "$_id" },
              regex: search,
              options: "i",
            },
          },
        });
      } else {
        orConditions.push({ [field]: { $regex: search, $options: "i" } });
      }
    }

    if (orConditions.length > 0) {
      filter.$or = orConditions;
    }
  }

  Object.entries(rest).forEach(([key, value]) => {
    const match = key.match(/(.+)\[(gte|gt|lte|lt|in)\]/);
    if (match) {
      const [, field, operator] = match;
      if (!filter[field]) filter[field] = {};
      filter[field][`$${operator}`] = value.includes(",")
        ? value.split(",")
        : value;
    } else if (typeof value === "string" && value.includes(",")) {
      filter[key] = { $in: value.split(",") };
    } else {
      filter[key] = value;
    }
  });

  const options = {
    page: Number(page),
    limit: Number(limit),
    sort,
    select: fields ? fields.split(",").join(" ") : "-__v",
  };

  return { filter, options };
}

export default buildQuery;
