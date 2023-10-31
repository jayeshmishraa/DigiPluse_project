import React, { Component } from "react";
import './node.css';

class node extends Component {

  state = {
    selectedOption: "single",
    nodeName: "",
    searchNode: "",
    tree: [],
  };

  handleOptionChange = (e) => {
    this.setState({ selectedOption: e.target.value });
  };

  handleNodeNameChange = (e) => {
    this.setState({ nodeName: e.target.value });
  };

  handleSearchNodeChange = (e) => {
    this.setState({ searchNode: e.target.value });
  };

  addNode = () => {
    const { nodeName, selectedOption, tree } = this.state;

    if (!nodeName) {
      return;
    }

    const newNode = { name: nodeName, children: [] };
    // =========
    // =========
    if (selectedOption === "single") {
      this.setState({ tree: [newNode] });
    } else if (selectedOption === "parent") {
      this.setState({ tree: [newNode, ...tree] });
    } else if (selectedOption === "child") {
      if (tree.length > 0) {
        const updatedTree = [...tree];
        updatedTree[updatedTree.length - 1].children.push(newNode);
        this.setState({ tree: updatedTree });
      } else {
        alert("Please select a Paremt node before adding a child node.");
      }
    }
    this.setState({ nodeName: "" });
  };

  updateNode = () => {
    const { searchNode, tree } = this.state;
    const updatedTree = JSON.parse(JSON.stringify(tree));

    let nodeNotFound = true;

    function findAndReplaceNode(node) {
      if (node.name === searchNode) {
        const updatedName = prompt("Enter the updated name for the node:");
        if (updatedName) {
          node.name = updatedName;
        }
        nodeNotFound = false;
      }
      if (node.children) {
        node.children.forEach(findAndReplaceNode);
      }
    }
   

    updatedTree.forEach(findAndReplaceNode);

    if (nodeNotFound) {
      alert(`Node "${searchNode}" not found.`);
    }

    this.setState({ tree: updatedTree, searchNode: "" });
  };


  deleteNode = () => {
    const { searchNode, tree } = this.state;
    const updatedTree = tree.filter((node) => node.name !== searchNode);
    this.setState({ tree: updatedTree, searchNode: "" });
  };

  render() {
    const { selectedOption, nodeName, searchNode, tree } = this.state;

    return (
      <div>
        <div>
          <select className="OptionBox" 
           onChange={this.handleOptionChange} 
           value={selectedOption}
           >
            <option value="single">Single</option>
            <option value="parent">Parent </option>
            <option value="child">Child </option>
          </select>
          <input
            type="text"
            placeholder="Name"
            value={nodeName}
            onChange={this.handleNodeNameChange}
          />
          <button onClick={this.addNode}>Add Node</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search "
            value={searchNode}
            onChange={this.handleSearchNodeChange}
          />
          <button onClick={this.updateNode}>Update Node</button>
          <button onClick={this.deleteNode}>Delete Node</button>
        </div>
        <div>
          <h2>Tree Structure:</h2>
          <pre>{JSON.stringify(tree,null,2)}</pre>
        </div>
      </div>
    );
  }
}

export default node;
