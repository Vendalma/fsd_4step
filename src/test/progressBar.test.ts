import { progressBar } from "../slider/MVP/View/progressBar";
const config = {
  range: true,
  orientation: "horisontal",
};
const block = $("<div>");
const secondThumb = $("<div>");
beforeEach(function () {
  block[0].classList.add("slider__block");
  secondThumb[0].classList.add("thumb_second");
  block.append(secondThumb[0]);
  $(document.body).append(block);
});
const ProgressBar: progressBar = new progressBar(config, block[0]);

describe("ProgressBar", () => {
  beforeEach(function () {
    const ProgressBar: progressBar = new progressBar(config, block[0]);
  });
  it("Инициализация ProgressBar", () => {
    expect(ProgressBar).toBeDefined();
    expect(ProgressBar.config).toEqual(config);
    expect(ProgressBar.slider).toBeInstanceOf(HTMLElement);
    expect(ProgressBar.slider).toContainElement("div.progress-bar");
    expect(ProgressBar.progressBar).toBeInstanceOf(HTMLElement);
    expect(ProgressBar.progressBar).toHaveClass("progress-bar");
  });
  describe("метода checkOrientation", () => {
    it("при orientaion = vertical устанавливает блоку класс progress-bar_vertical и удаляет класс progress-bar_horisontal", () => {
      ProgressBar.config.orientation = "vertical";
      ProgressBar.checkOrientation();
      expect(ProgressBar.progressBar).toHaveClass("progress-bar_vertical");
      expect(ProgressBar.progressBar).not.toHaveClass(
        "progress-bar_horisontal"
      );
    });
    it("при orientaion = horisontal устанавливает блоку класс progress-bar_horisontal и удаляет класс progress-bar_vertical", () => {
      ProgressBar.config.orientation = "horisontal";
      ProgressBar.checkOrientation();
      expect(ProgressBar.progressBar).not.toHaveClass("progress-bar_vertical");
      expect(ProgressBar.progressBar).toHaveClass("progress-bar_horisontal");
    });
  });

  describe("метод setOnloadProgressBarPosition", () => {
    let data: any;
    let onloadPositionThumbOne: number;
    let onloadPositionThumbTwo: number;
    beforeAll(function () {
      data = {
        thumbData: {
          onloadPositionThumbOne: 15,
          onloadPositionThumbTwo: 100,
        },
      };
      onloadPositionThumbOne = data.thumbData.onloadPositionThumbOne;
      onloadPositionThumbTwo = data.thumbData.onloadPositionThumbTwo;
    });
    it("при orientation = horisontal, range = false устанавливает style.left и style.width", () => {
      ProgressBar.config.range = false;
      ProgressBar.config.orientation = "horisontal";
      ProgressBar.setOnloadProgressBarPosition(data);
      expect(ProgressBar.progressBar).toHaveCss({ left: "0px" });
      expect(ProgressBar.progressBar).toHaveCss({
        width: onloadPositionThumbOne + 2 + "px",
      });
    });
    it("при orientation = horisontal, range = true  устанавливает style.left и style.width", () => {
      ProgressBar.config.range = true;
      ProgressBar.config.orientation = "horisontal";
      ProgressBar.setOnloadProgressBarPosition(data);
      expect(ProgressBar.progressBar).toHaveCss({
        left: onloadPositionThumbOne + "px",
      });
      expect(ProgressBar.progressBar).toHaveCss({
        width: onloadPositionThumbTwo - onloadPositionThumbOne + "px",
      });
    });
    it("при orientation = vertical, range = false  устанавливает style.top и style.height", () => {
      ProgressBar.config.range = false;
      ProgressBar.config.orientation = "vertical";
      ProgressBar.setOnloadProgressBarPosition(data);
      expect(ProgressBar.progressBar).toHaveCss({ top: "-1px" });
      expect(ProgressBar.progressBar).toHaveCss({
        height: onloadPositionThumbOne + 2 + "px",
      });
    });
    it("при orientation = vertical, range = true  устанавливает style.top и style.height", () => {
      ProgressBar.config.range = true;
      ProgressBar.config.orientation = "vertical";
      ProgressBar.setOnloadProgressBarPosition(data);
      expect(ProgressBar.progressBar).toHaveCss({
        top: onloadPositionThumbOne + "px",
      });
      expect(ProgressBar.progressBar).toHaveCss({
        height: onloadPositionThumbTwo - onloadPositionThumbOne + "px",
      });
    });
  });
  describe("метод setPositionForThumbOne", () => {
    let position: number;
    let secondThumb: HTMLElement;
    beforeAll(function () {
      position = 100;
      secondThumb = ProgressBar.slider.querySelector(
        ".thumb_second"
      ) as HTMLElement;
    });
    it("при orientation = horisontal, range = false устанавливает style.width для блока", () => {
      ProgressBar.config.range = false;
      ProgressBar.config.orientation = "horisontal";
      ProgressBar.setPositionForThumbOne(position);
      expect(ProgressBar.progressBar).toHaveCss({ width: position + 2 + "px" });
    });

    it("при orientation = horisontal, range = true устанавливает блоку style.width и style.left", () => {
      ProgressBar.config.range = true;
      ProgressBar.config.orientation = "horisontal";
      secondThumb.style.left = "170px";
      ProgressBar.setPositionForThumbOne(position);
      expect(ProgressBar.progressBar).toHaveCss({ left: position + "px" });
      expect(ProgressBar.progressBar).toHaveCss({
        width: parseInt(secondThumb.style.left) - position + "px",
      });
    });
    it("при orientation = vertical, range = false устанавливает блоку style.height", () => {
      ProgressBar.config.range = false;
      ProgressBar.config.orientation = "vertical";
      ProgressBar.setPositionForThumbOne(position);
      expect(ProgressBar.progressBar).toHaveCss({
        height: position + 2 + "px",
      });
    });
    it("при orientation = vertical, range = true устанавливает блоку style.height и style.top", () => {
      ProgressBar.config.range = true;
      ProgressBar.config.orientation = "vertical";
      secondThumb.style.top = "270px";
      ProgressBar.setPositionForThumbOne(position);
      expect(ProgressBar.progressBar).toHaveCss({ top: position + "px" });
      expect(ProgressBar.progressBar).toHaveCss({
        height: parseInt(secondThumb.style.top) - position + "px",
      });
    });
  });
  describe("проверка метода setPositionForThumbTwo", () => {
    let position: number;
    beforeAll(function () {
      position = 254;
      ProgressBar.progressBar.style.left = "100px";
      ProgressBar.progressBar.style.top = "30px";
    });
    it("при orientation = horisontal устанавливает блоку style.width", () => {
      ProgressBar.config.orientation = "horisontal";
      ProgressBar.setPositionForThumbTwo(position);
      expect(ProgressBar.progressBar).toHaveCss({
        width:
          position - parseInt(ProgressBar.progressBar.style.left) + 7 + "px",
      });
    });
    it("при orientation = vertical устанавливает блоку style.height", () => {
      ProgressBar.config.orientation = "vertical";
      ProgressBar.setPositionForThumbTwo(position);
      expect(ProgressBar.progressBar).toHaveCss({
        height:
          position - parseInt(ProgressBar.progressBar.style.top) + 5 + "px",
      });
    });
  });
  it("метод updateBarConfig обновляет конфиг и вызывает ф-ю checkOrientation", () => {
    spyOn(ProgressBar, "checkOrientation");
    ProgressBar.updateBarConfig({});
    expect(ProgressBar.checkOrientation).toHaveBeenCalled();
  });
});
