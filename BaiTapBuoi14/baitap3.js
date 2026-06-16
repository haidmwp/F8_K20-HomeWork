function classifyUser(user) {
  const isAdult = user.age >= 18;
  const role = (user.role !== null && user.role !== undefined) ? user.role : "guest";
  
  return {
    displayName: user.name ? user.name : "Ẩn danh",
    isAdult: isAdult,
    hasEmail: typeof user.email === "string" && user.email.trim() !== "",
    role: role,
    status: user.score >= 80 ? "vip" : (user.score >= 50 ? "normal" : "new"),
    canAccess: isAdult && role !== "guest"
  };
}

const user = {
  name: "An",
  age: 17,
  email: "",
  score: 0,
  role: null,
};

console.log(classifyUser(user));