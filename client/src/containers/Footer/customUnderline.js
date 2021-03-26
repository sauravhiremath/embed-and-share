import "./footer.css";

export function CustomUnderline({ text, link, style }) {
  return (
    <div style={{ display: "inline-flex" }}>
      <div className="svg-wrap">
        <svg viewBox="0 0 400 60" xmlns="http://www.w3.org/2000/svg">
          <path
            id="svg_marker"
            d="m 3.518915,27.827324 c 55.429038,4.081 111.581115,5.822 167.117815,2.867 22.70911,-1.208 45.39827,-0.601 68.126,-0.778 28.38172,-0.223 56.76078,-1.024 85.13721,-1.33 24.17378,-0.261 48.4273,0.571 72.58114,0.571"
          ></path>
        </svg>
      </div>
      <section className="link-svgmarker">
        <span
          href={link}
          rel="noreferrer"
          target="_blank"
          style={{ fontWeight: 600, ...style }}
        >
          {text}
          <svg className="link-svgline">
            <use xlinkHref="#svg_marker"></use>
          </svg>
        </span>
      </section>
    </div>
  );
}
