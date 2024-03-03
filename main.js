(function() {
    const studentDataElement = document.getElementById('studentData');
  
    // Task 2: Implementing an IIFE
    function displayStudentData() {
      fetch('students.json')
        .then(response => response.json())
        .then(data => {
          const studentList = data.map(student => {
            return `<div>Name: ${student.name} - Age: ${student.age} - Grade: ${student.grade} - Major: ${student.major}</div>`;
          }).join('');
          studentDataElement.innerHTML = studentList;
        })
        .catch(error => {
          studentDataElement.innerHTML = `<div>Error fetching data: ${error}</div>`;
        });
    }
  
    // Task 3: Handling Asynchronous Operations with Promises
    function fetchData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          fetch('students.json')
            .then(response => {
              if (!response.ok) {
                throw new Error('failed to fetch data');
              }
              return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
        }, 1000); // Time of delay
      });
    }
  
    // Task 4: Implementing Additional Functionality with Buttons
    document.getElementById('filterCSAgeGreaterThan20').addEventListener('click', () => {
      fetchData()
        .then(data => {
          const filteredStudents = data.filter(student => student.major === 'Computer Science' && student.age > 20);
          displayFilteredStudents(filteredStudents);
        })
        .catch(error => {
          studentDataElement.innerHTML = `<div>Error: ${error}</div>`;
        });
    });
  
    document.getElementById('calculateAverageAge').addEventListener('click', () => {
      fetchData()
        .then(data => {
          const totalAge = data.reduce((acc, student) => acc + student.age, 0);
          const averageAge = totalAge / data.length;
          studentDataElement.innerHTML = `<div>Average Age: ${averageAge}</div>`;
        })
        .catch(error => {
          studentDataElement.innerHTML = `<div>Error: ${error}</div>`;
        });
    });
  
    document.getElementById('filterOddIndex').addEventListener('click', () => {
      fetchData()
        .then(data => {
          const oddIndexStudents = data.filter((student, index) => index % 2 !== 0);
          displayFilteredStudents(oddIndexStudents);
        })
        .catch(error => {
          studentDataElement.innerHTML = `<div>Error: ${error}</div>`;
        });
    });
  
    // This helps the function to display filtered students
    function displayFilteredStudents(students) {
      const filteredStudentList = students.map(student => {
        return `<div>Name: ${student.name} - Age: ${student.age} - Grade: ${student.grade} - Major: ${student.major}</div>`;
      }).join('');
      studentDataElement.innerHTML = filteredStudentList;
    }
  
    // This display the student data
    displayStudentData();
  })();