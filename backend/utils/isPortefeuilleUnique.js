function isPortefeuilleUnique(newRecords, oldRecords) {
  return newRecords.every((newRecord) => {
    const { type, name } = newRecord;

    // Check if there is an existing object with the same type and name in the database
    const existingRecord = oldRecords.find(
      (record) => record.type === type && record.name === name
    );

    // If existingRecord is undefined, the new record is unique
    return !existingRecord;
  });
}
module.exports = isPortefeuilleUnique;
