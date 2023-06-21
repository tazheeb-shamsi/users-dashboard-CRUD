import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { deleteUser, getUsers, updateUser } from "../api";
const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedUserData, setEditedUserData] = useState(null);
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUsersData();
  }, []);

  const handleEdit = (userId) => {
    const selectedUser = users.find((user) => user.id === userId);

    if (selectedUser) {
      setSelectedUser(selectedUser);
      setEditedUserData({ ...selectedUser });
      setEditModalVisible(true);
    } else {
      console.error("User not found");
    }
  };

  const handleDelete = async (userId) => {
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      try {
        await deleteUser(userId);

        const updatedUsers = [...users];
        updatedUsers.splice(userIndex, 1);
        setUsers(updatedUsers);

        Alert.alert(
          "Success",
          `User with User Id: ${userId} deleted successfully `
        );
      } catch (error) {
        console.error(error.message);
        Alert.alert("Error", "Failed to delete user");
      }
    } else {
      console.error("User not found");
    }
  };

  const saveEditedUser = async () => {
    try {
      const updatedUser = await updateUser(selectedUser.id, editedUserData);

      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? updatedUser : user
      );

      setUsers(updatedUsers);
      setEditModalVisible(false);

      Alert.alert("Success", "User updated successfully");
    } catch (error) {
      console.error(error.message);
      Alert.alert("Error", "Failed to update user");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {users.map((user) => (
        <View style={styles.card} key={user.id}>
          <Text style={styles.name}>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Gender: {user.gender}</Text>
          <Text>Status: {user.status}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEdit(user.id)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(user.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal
        visible={editModalVisible}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit User</Text>

          <TextInput
            style={styles.input}
            value={editedUserData?.name || ""}
            onChangeText={(text) =>
              setEditedUserData((prevData) => ({
                ...prevData,
                name: text,
              }))
            }
            placeholder={`Name (${selectedUser?.name || ""})`}
            placeholderTextColor="black"
          />

          <TextInput
            style={styles.input}
            value={editedUserData?.email || ""}
            onChangeText={(text) =>
              setEditedUserData((prevData) => ({
                ...prevData,
                email: text,
              }))
            }
            placeholder={`Email (${selectedUser?.email || ""})`}
            placeholderTextColor="black"
          />

          <TextInput
            style={styles.input}
            value={editedUserData?.gender || ""}
            onChangeText={(text) =>
              setEditedUserData((prevData) => ({
                ...prevData,
                gender: text,
              }))
            }
            placeholder={`Gender :  (${selectedUser?.gender || ""})`}
            placeholderTextColor="black"
          />

          <TextInput
            style={styles.input}
            value={editedUserData?.status || ""}
            onChangeText={(text) =>
              setEditedUserData((prevData) => ({
                ...prevData,
                status: text,
              }))
            }
            placeholder={`Status (${selectedUser?.status || ""})`}
            placeholderTextColor="black"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveEditedUser}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#efefed",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default UserListScreen;
