// Entidades del dominio compartidas entre cliente y servidor.

export type Categoria = {
  id: string;
  empresa_id: string;
  nombre: string;
  slug: string;
  orden: number;
  activo: boolean;
  created_at: string;
  updated_at: string;
};

export type Producto = {
  id: string;
  empresa_id: string;
  categoria_id: string | null;
  nombre: string;
  slug: string;
  descripcion: string | null;
  precio_referencia: number | null;
  moneda: string;
  imagen_url: string | null;
  destacado: boolean;
  orden: number;
  activo: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductoConCategoria = Producto & {
  categoria: Pick<Categoria, "id" | "nombre" | "slug"> | null;
};

export type PerfilUsuario = {
  id: string;
  empresa_id: string;
  email: string;
  rol: "root" | "gestor";
  nombre_completo: string | null;
  activo: boolean;
};

export type LiquidacionRow = {
  fecha_registro: string;
  codigo_producto: string;
  nombre_producto: string;
  turno: string;
  pct_recargo: number;
  codigo_cc: string;
  centro_costo: string;
  documento_id: string;
  nombre_operario: string;
  cantidad_total: number;
  n_operarios: number;
  cantidad_individual: number;
  precio_unitario: number;
  valor_liquidado: number;
};
