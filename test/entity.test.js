import Entity from "./../src/Entity";
import Engine from "./../src/Engine";
import Scene from "./../src/Scene";


describe("Entity testing", () => {
    let entity;

    beforeEach(() => {
        entity = new Entity();
    });

    it("should be name 'entity'", () => {
        expect(entity.name).toBe("entity");
    });

    it("should draw box red when it is in debug mode", () => {
        const scene = new Scene();

        Engine.width(10);
        Engine.height(10);
        Engine.attachScene(scene);
        scene.attachEntity(entity);

        entity.debug = true;

        entity.width(10);
        entity.height(10);
        Engine.render();

        expect(scene.canvas.context.getImageData(0, 0, 1, 1).data[0]).not.toBeLessThan(100);
    });

    it("should return 0 distance if distanceTo has no parameter", () => {
        expect(entity.distanceTo(null)).toBe(0);
    });

    it("should have correct distance between two entities", () => {
        const target = new Entity();

        entity.x(0);
        entity.y(0);
        target.x(0);
        target.y(10);

        expect(entity.distanceTo(target)).toBe(10);
    });

    it("should return direction to left", () => {
        const target = new Entity();

        target.x(-100);
        expect(entity.directionTo(target)).toEqual(jasmine.objectContaining({x: -1, y: 0}));
    });

    it("should return direction to right", () => {
        const target = new Entity();

        target.x(100);
        expect(entity.directionTo(target)).toEqual(jasmine.objectContaining({x: 1, y: 0}));
    });

    it("should return direction to top", () => {
        const target = new Entity();

        target.y(-100);
        expect(entity.directionTo(target)).toEqual(jasmine.objectContaining({x: 0, y: -1}));
    });

    it("should return direction to bottom", () => {
        const target = new Entity();

        entity.y(-100);
        expect(entity.directionTo(target)).toEqual(jasmine.objectContaining({x: 0, y: 1}));
    });

    it("should not intersect target", () => {
        const target = new Entity();

        target.x(100);
        expect(entity.intersect(target)).toBeFalsy();
    });

    it("should intersect target", () => {
        const target = new Entity();

        expect(entity.intersect(target)).toBeTruthy();
    });

    it("should intersect target with separation from 1 pixel", () => {
        const target = new Entity();

        target.x(10);
        expect(entity.intersect(target)).toBeTruthy();
    });

    it("should move forward", () => {
        entity.direction.x = 1;
        entity.update();

        expect(entity.x()).toBe(100);
    });

    it("should jump", () => {
        entity.direction.y = -1;
        entity.update();

        expect(entity.y()).toBe(-100);
    });

    it("should be down by gravity", () => {
        const scene = new Scene();

        scene.gravity = 10;
        scene.attachEntity(entity);
        scene.update();

        expect(entity.y()).toBe(10);
    });
});
