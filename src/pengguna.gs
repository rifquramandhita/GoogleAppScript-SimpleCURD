const doPostUser = (request) => {
  const { parameter, postData: { contents, type } = {} } = request;
  const action = parameter.action;

  switch (action) {
    case "login":
      response = loginUser(JSON.parse(contents));
      break;
    //add another action
  }

  return response;
};

const doGetUser = (req) => {
  let action = req.parameter.action;
  switch (action) {
    case "getAll":
      response = getAllUser();
      break;
    //add another action
  }

  return response;
};

/*controller*/
const loginUser = (data) => {
  let user = getByEmailUser_dataSource(data.email);

  if (user != null && user.password == data.password) {
    response = {
      status: true,
      message: "Sukses melakukan login",
      data: {
        email: user.email,
        nama_lengkap: user.nama_lengkap,
        role: user.role,
      },
    };
  } else {
    response = {
      status: false,
      message: "Kombinasi email dan password tidak ditemukan",
    };
  }
  return response;
};

const getAllUser = (data) => {
  let listUser = getAllUser_dataSource();

  if (listUser.length > 0) {
    response = {
      status: true,
      message: "Sukses mengambil data",
      data: listUser,
    };
  } else {
    response = {
      status: false,
      message: "Tidak terdapat data",
    };
  }

  return response;
};

//add another controller function

/* dataSource */
const getAllUser_dataSource = () => {
  let rowData = getSheet().getDataRange().getValues();
  let listUser = mapToModelUser(rowData);
  return listUser;
};

const getByEmailUser_dataSource = (email) => {
  let listUser = getAllUser_dataSource();
  let userFiltered = listUser.filter((item) => {
    return email == item.email;
  });

  if (userFiltered.length > 0) {
    return userFiltered[0];
  } else {
    return null;
  }
};

//add another data source function

/* map */
const mapToModelUser = (rowData) => {
  let dataModel = [];
  for (i = 1; i < rowData.length; i++) {
    // according to the column in your table
    dataModel.push({
      email: rowData[i][0],
      password: rowData[i][1],
      nama_lengkap: rowData[i][2],
      role: rowData[i][3],
      updated_at: rowData[i][4],
    });
  }
  return dataModel;
};

const mapToArrayUser = (dataModel) => {
  let rowData = [];
  for (let i = 0; i < dataModel.length; i++) {
    let row = [];
    // according to the column in your table
    row.push(dataModel[i].email);
    row.push(dataModel[i].password);
    row.push(dataModel[i].nama_lengkap);
    row.push(dataModel[i].role);
    row.push(dataModel[i].updated_at);

    rowData.push(row);
  }
  return rowData;
};
