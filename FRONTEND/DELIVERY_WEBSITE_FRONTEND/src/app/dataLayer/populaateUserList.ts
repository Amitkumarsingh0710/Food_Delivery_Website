import { UserModel } from "../model/UserModel";
export function populateUserList(){
     let dummyUserList: UserModel[] = [
          {
            id: 1,
            name: "John Doe",
            dob: "1990-05-15",
            password: "John@123",
            email: "john@gmail.com",
            role: "user",
            address: {
              flatNo: 101,
              landmark: "Near City Park",
              street: "123 Main Street",
              city: "Springfield",
              state: "Illinois",
              zipCode: "627015"
            }
          },
          {
            id: 2,
            name: "Pranav",
            dob: "1990-05-15",
            password: "Pranav@123",
            email: "pranav123@gmail.com",
            role: "user",
            address: {
              flatNo: 101,
              landmark: "Apollo Pharmacy",
              street: "Kreenatham",
              city: "Coimbatore",
              state: "Tamil",
              zipCode: "711110"
            }
          },
          {
            id: 3,
            name: "Amit Singh",
            dob: "2002-07-22",
            password: "Amit@123",
            email: "amitsingh@namaste.com",
            role: "resOwner",
            address: {
              flatNo: 202,
              landmark: "Opposite Mall",
              street: "456 Elm Avenue",
              city: "Metropolis",
              state: "New York",
              zipCode: "100013"
            }
          },
          {
            id: 4,
            name: "Suvam Das",
            dob: "2002-09-22",
            password: "Suvam@123",
            email: "suvamdas@lunchbox.com",
            role: "admin",
            address: {
              flatNo: 202,
              landmark: "Opposite Mall",
              street: "456 Elm Avenue",
              city: "Metropolis",
              state: "New York",
              zipCode: "100014"
            }
          },
          
        ];
        localStorage.setItem("userList", JSON.stringify(dummyUserList));
        return dummyUserList;
}