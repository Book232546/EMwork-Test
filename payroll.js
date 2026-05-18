async function processPayroll(empId, baseSalary, otHours) {

    //แปลงหน่วยให้เป็นสตางค์
    const baseInSatang = Math.round(baseSalary * 100)

    //คำนวนทุกอย่างในหน่วยสตางค์
    const ssoInSatang = Math.round(baseInSatang * 5)/100

    const otRateInSatang = Math.round(baseInSatang / 30 / 8 * 15)/10

    const grossInSatang = baseInSatang + (otHours * otRateInSatang)

    const netInSatang = grossInSatang - ssoInSatang


    //แก้โดยแยก Parameter ออกมา ให้ใช้คำสั่งก่อนแล้วค่อยส่งข้อมูลไปทีหลัง และช่วยแก้ไข Racecondition ได้ เพราะมีกาต่อคิวการทำงาน
    await db.query('UPDATE salaries SET balance = balance + $1 WHERE emp_id = $2'
        
        , [netInSatang, empId]);

    return netInSatang / 100;

}
