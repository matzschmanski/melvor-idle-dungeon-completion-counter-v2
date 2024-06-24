export async function setup(ctx) {
	const _gameFileVersion = parseInt(gameFileVersion.substr(1));

	let moduleName = 'src/v1.3.0/main.mjs';
	//if(_gameFileVersion >= 9831)
	//	moduleName = 'src/v1.3.0/main.mjs';

    const module = await ctx.loadModule(moduleName);
    module.setup(ctx);
}