import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 30,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  logContainer:{
    flex: 1,
justifyContent: "center", // Center the content vertically
alignItems: "center", // Center the content horizontally
backgroundColor: "white",
padding:10,
  },
 container: {
    flex: 1,
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
    backgroundColor: "white",
  },
  logo: {
    width: 100, // Set a width for the logo
    height: 100, // Set a height for the logo (you can adjust as needed)
    resizeMode: "contain", // Keep the logo's aspect ratio
    marginBottom:20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around', // This already makes sure there's space between items
    padding: 5,
    width: '100%', // Use full width of the container
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    width: 250,
    backgroundColor: "#f7f7f7",
    color: 'black',
    borderWidth: 1,   
    borderColor: 'black',
    borderRadius: 25, // Rounded edges
    marginBottom: 10, // Gap between items
    textAlign: 'center', 
  },
  homeText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: "80%",
    marginTop: 10,
    marginBottom: 10 // Add margin to separate paragraphs
  }

})