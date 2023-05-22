import React, { useEffect, useState } from 'react'
import { employeeData }  from '../constant';
import Pagination from '@mui/material/Pagination';

function HomePage() {
  const [employeeDataList, setEmployeeDataList] = useState(employeeData)
  const [domainOptions, setDomainOptions] = useState([])
  const [genderOptions, setgenderOptions] = useState([])

  const [selectedDomain, setSelectedDomain] = useState("All")
  const [selectedGender, setSelectedGender] = useState("All")
  const [selectedAvailability, setSelectedAvailability] = useState("All")
  const [name, setName] = useState("")

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(employeeDataList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employeeDataList.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => setCurrentPage(value);

  useEffect(() => {
    let tempData = employeeData.filter((item) =>
      (selectedDomain === "All" || item.domain === selectedDomain) &&
      (selectedGender === "All" || item.gender === selectedGender) &&
      (selectedAvailability === "All" || item.available === (selectedAvailability === 'true')) &&
      (name === "" || (item.first_name.toLowerCase().includes(name.toLowerCase()) || item.last_name.toLowerCase().includes(name.toLowerCase())))
    );

    setEmployeeDataList(tempData);
  }, [selectedDomain, selectedGender, selectedAvailability, name]);

  useEffect(() => {
    let tempDomainList = employeeData.map((item) => {
      return item.domain
    })
    let tempGenderList = employeeData.map((item) => {
      return item.gender
    })
    setDomainOptions([...new Set(tempDomainList)])
    setgenderOptions([...new Set(tempGenderList)])
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px", width: "100%", height: "100vh", overflowX: "hidden" }}>
      <div
        style={{
          display: 'flex', justifyContent: 'flex-start', alignItems: "center", background: '#D25380',
        }}>
        <span style={{ color: 'black', fontWeight: 'bold', fontSize: "22px", marginLeft: "20px", padding: "20px 0px" }}>MOCK DATA</span>
      </div>

      <div style={{ width: "100%", margin: "0px 10px" }}>
        <input
          onChange={(e) => { setName(e.target.value) }}
          style={{ height: '40px', width: "100%", fontSize: "16px" }}
          type="text"
          placeholder='Search Name....'
        ></input>
      </div>


      <div style={{ display: 'flex', margin: "0px 10px", gap: '20px', flexWrap: "wrap" }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Domain</label>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            style={{ marginRight: '20px', width: '150px', height: '40px', fontSize: "16px", }}>
            <option value="All">All</option>
            {
              domainOptions.map((item, index) => (
                <option value={item}>{item}</option>
              ))
            }


          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Gender</label>
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            style={{ marginRight: '20px', width: '150px', height: '40px', fontSize: "16px", }}>
            <option value="All">All</option>
            {
              genderOptions.map((item, index) => (
                <option value={item}>{item}</option>
              ))
            }
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Availability</label>
          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            style={{ marginRight: '20px', width: '150px', height: '40px', fontSize: "16px", }}>
            <option value="All">All</option>
            <option value="true">Online</option>
            <option value="false">Offline</option>
          </select>
        </div>
      </div>
      {/* Datas */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
        {currentEmployees.map((item, index) => (

          <div style={{ width: "250px", border: '1px solid black', borderRadius: '5px', display: "flex", flexDirection: "column", gap: "10px", padding: "20px" }}>
            <span style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', fontSize: "26px", }}>{item.first_name + " " + item.last_name}</span>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: '16px', }}>Email</span>
              <span style={{ fontSize: '18px', color: "#D25380", textOverflow: "ellipsis" }}>{item.email}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: '16px', }}>Domain</span>
              <span style={{ fontSize: '18px', color: "#D25380" }}> {item.domain}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: '16px', }}>Gender</span>
              <span style={{ fontSize: '18px', color: "#D25380" }}> {item.gender}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: '16px', }}>Availablity</span>
              <span style={{ fontSize: '18px', color: item.available ? "green" : "red" }}> {item.available ? "Online" : "Offline"}</span>
            </div>

          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} variant="outlined" shape="rounded" />
      </div>


    </div>

  );
}

export default HomePage;
