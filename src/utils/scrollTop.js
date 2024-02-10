const scrollTop = (e) => {
  e?.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 800);
};

export default scrollTop;
