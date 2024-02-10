// const rules = {
//     name: [
//       {
//         required: true,
//         message: "Vui lòng nhập tên",
//       },
//     ],
//     email: [
//       {
//         required: true,
//         message: "Vui lòng nhập email",
//       },
//       {
//         regrex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
//         message: "Vui lòng nhập đúng định dạng email",
//       },
//     ],
//   };

//   rules[ruleKey]=  [
//       {
//         required: true,
//         message: "Vui lòng nhập email",
//       },
//       {
//         regrex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
//         message: "Vui lòng nhập đúng định dạng email",
//       },
//     ]

// rule = {
//         required: true,
//         message: "Vui lòng nhập email",
//       }

// rule = {
//         regrex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
//         message: "Vui lòng nhập đúng định dạng email",
//       }

const REGREX = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
};

const validate = (rules, values) => {
  let errObj = {};
  for (const ruleKey in rules) {
    for (const rule of rules[ruleKey]) {
      //   Case: Required
      if (rule.required) {
        if (!!!values[ruleKey]) {
          errObj[ruleKey] = rule.message || "Vui lòng nhập";
          break;
        }
      }

      //  Case: Regrex
      if (rule.regrex && values[ruleKey]) {
        let pattern = "";
        if (rule.regrex in REGREX) {
          pattern = REGREX[rule.regrex];
        } else if (rule.regrex instanceof RegExp) {
          pattern = rule.regrex;
        } else pattern = new RegExp(rule.regrex, "gi");
        // console.log("pattern", pattern);
        if (!pattern.test(values[ruleKey])) {
          errObj[ruleKey] = rule.message || "Vui lòng nhập đúng định dạng";
          break;
        }
      }

      // Case: Function
      if (typeof rule === "function") {
        const message = rule(values[ruleKey], values, errObj);
        console.log("message", message);
        if (!!message) {
          errObj[ruleKey] = message || "Dữ liệu nhập sai yêu cầu";
          break;
        }
      }
    }
  }
  return errObj;
};

export const requireRule = (message) => {
  return {
    required: true,
    message,
  };
};

export const regrexRule = (regrex, message) => {
  return {
    regrex,
    message,
  };
};

export default validate;
