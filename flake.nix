{
  description = "Personal blog — ajlow2000 terminus";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
            bun
          ];

          shellHook = ''
            echo "node $(node --version) | bun $(bun --version)"
            echo ""
            echo "  bun install     install dependencies"
            echo "  bun run dev     dev server at localhost:4321"
            echo "  bun run build   build to dist/"
            echo "  bun run preview serve dist/"
          '';
        };
      });
}
