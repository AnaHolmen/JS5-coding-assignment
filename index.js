class Chip {
  constructor(name, dip) {
    this.name = name;
    this.dip = dip;
  }
  describe() {
    //console.log(`${this.name} and ${this.dip}`)
    return `${this.name} and ${this.dip}`;
  }
}

class Snack {
  constructor(name) {
    this.name = name;
    this.chips = [];
  }

  addChip(chip) {
    if (chip instanceof Chip) {
      this.chips.push(chip);
    } else {
      throw new Error(`You can only add an instance of chip. 
     argument is not a chip: ${chip}`);
    }
  }

  describe() {
    return `${this.name} has ${this.chips.length} chips.`;
  }
}

class Menu {
  // what drives the application and our choices
  constructor() {
    this.snacks = [];
    this.selectedSnack = null; // manage one snack at a time
  }

  start() {
    // entry point to application
    let selection = this.showMainMenuOptions();
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createSnack();
          break;
        case "2":
          this.viewSnack();
          break;
        case "3":
          this.deleteSnack();
          break;
        case "4":
          this.displaySnacks();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }
    alert("Goodbye!");
  }

  // menu prompts to add new snacks//
  showMainMenuOptions() {
    return prompt(`
      0) exit
      1) create a new snack
      2) view a snack
      3) delete a snack
      4) display all snacks
      `);
  }
  // menu prompts to add chips or delete them//
  showSnackMenuOptions(snackInfo) {
    return prompt(`
          0) back
          1) add a new chip
          2) delete a chip
          -----------------
          ${snackInfo}
          `);
  }

  displaySnacks() {
    let snackString = "";
    for (let i = 0; i < this.snacks.length; i++) {
      snackString += i + ") " + this.snacks[i].name + "\n";
    }
    alert(snackString);
  }

  createSnack() {
    let name = prompt("Enter name for new snack: ");
    this.snacks.push(new Snack(name));
  }

  viewSnack() {
    let index = prompt("Enter the index of the Snack that you want to view:");
    if (index > -1 && index < this.snacks.length) {
      this.selectedSnack = this.snacks[index];
      let description = "Snack Name: " + this.selectedSnack.name + "\n";
      description += "" + this.selectedSnack.describe() + "\n ";
      for (let i = 0; i < this.selectedSnack.chips.length; i++) {
        // description += i + ') ' + this.selectedSnack.chips[i].name + ' - '
        // + this.selectedSnack.chips[i].dip + '\n';
        description += i + ") " + this.selectedSnack.chips[i].describe() + "\n";
      }
      let selection = this.showSnackMenuOptions(description);
      switch (selection) {
        case "1":
          this.createChip();
          break;
        case "2":
          this.deleteChip();
      }
    } // validate user input
  }

  deleteSnack() {
    let index = prompt(
      "Enter the index of the snack that you wish to delete: "
    );
    if (index > -1 && index < this.snacks.length) {
      this.snacks.splice(index, 1);
    }
  }

  createChip() {
    let name = prompt("Enter name for new chip: ");
    let dip = prompt("Enter dip for new chip: ");
    //this.selectedSnack.chips.push(new Chip(name, dip));
    this.selectedSnack.addChip(new Chip(name, dip));
  }

  deleteChip() {
    let index = prompt("Enter the index of the chip that you wish to delete: ");
    if (index > -1 && index < this.selectedSnack.chips.length) {
      this.selectedSnack.chips.splice(index, 1);
    }
  }
}

let menu = new Menu();
menu.start();
