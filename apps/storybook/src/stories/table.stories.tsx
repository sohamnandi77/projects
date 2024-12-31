import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { EllipsisVertical, Loader, Star } from "lucide-react";

import type { Selection } from "@projects/ui";
import {
  NumberFormatter,
  useAsyncList,
  useDragAndDrop,
  useListData,
} from "@projects/ui";
import { Card } from "@projects/ui/card";
import { Description } from "@projects/ui/form";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@projects/ui/menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumn,
  TableFooter,
  TableHeader,
  TableRow,
} from "@projects/ui/table";

const meta = {
  title: "Components/Table",
  component: Table,
  subcomponents: {
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    TableFooter,
    TableCaption,
  },
  tags: ["autodocs", "collections"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const products = [
      {
        id: "1",
        name: "iPhone 13",
        category: "Electronics",
        price: 799,
        brand: "Apple",
        stock: 150,
      },
      {
        id: "2",
        name: "Galaxy S21",
        category: "Electronics",
        price: 699,
        brand: "Samsung",
        stock: 200,
      },
      {
        id: "3",
        name: "MacBook Pro",
        category: "Computers",
        price: 1299,
        brand: "Apple",
        stock: 80,
      },
      {
        id: "4",
        name: "Dell XPS 13",
        category: "Computers",
        price: 999,
        brand: "Dell",
        stock: 50,
      },
      {
        id: "5",
        name: "Sony WH-1000XM4",
        category: "Headphones",
        price: 349,
        brand: "Sony",
        stock: 120,
      },
      {
        id: "6",
        name: "AirPods Pro",
        category: "Headphones",
        price: 249,
        brand: "Apple",
        stock: 180,
      },
      {
        id: "7",
        name: "Fitbit Charge 5",
        category: "Wearables",
        price: 179,
        brand: "Fitbit",
        stock: 75,
      },
    ];

    const formatter = new NumberFormatter("en-US", {
      style: "currency",
      currency: "USD",
    });

    const priceFormat = (price: number) => formatter.format(price);

    return (
      <Card className="w-[650px]">
        <Table aria-label="Products">
          <TableHeader>
            <TableColumn className="w-0">#</TableColumn>
            <TableColumn isRowHeader>Name</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Stock</TableColumn>
            <TableColumn />
          </TableHeader>
          <TableBody items={products}>
            {(item) => (
              <TableRow id={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{priceFormat(item.price)}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <Menu>
                      <MenuTrigger
                        appearance="plain"
                        size="icon"
                        className="flex items-center">
                        <EllipsisVertical className="size-4" />
                      </MenuTrigger>
                      <MenuContent
                        aria-label="Actions"
                        showArrow
                        placement="left">
                        <MenuItem>View</MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuSeparator />
                        <MenuItem isDanger>Delete</MenuItem>
                      </MenuContent>
                    </Menu>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    );
  },
};

export const BulkActions: Story = {
  render: function Render() {
    const books = [
      {
        id: "1",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        publishedYear: 1960,
      },
      {
        id: "2",
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        publishedYear: 1949,
      },
      {
        id: "3",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        publishedYear: 1925,
      },
      {
        id: "4",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Fiction",
        publishedYear: 1951,
      },
      {
        id: "5",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        publishedYear: 1813,
      },
      {
        id: "6",
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        publishedYear: 1954,
      },
      {
        id: "7",
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        genre: "Fantasy",
        publishedYear: 1997,
      },
    ];

    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

    return (
      <>
        <Card className="w-[650px]">
          <Table
            aria-label="Books"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}>
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn isRowHeader>Title</TableColumn>
              <TableColumn>Author</TableColumn>
              <TableColumn>Genre</TableColumn>
              <TableColumn>Published</TableColumn>
            </TableHeader>
            <TableBody items={books}>
              {(item) => (
                <TableRow>
                  <TableCell>{item.id}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {item.title}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {item.author}
                  </TableCell>
                  <TableCell>{item.genre}</TableCell>
                  <TableCell>{item.publishedYear}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
        <Description className="mt-2 block text-muted-fg [&>strong]:text-fg">
          {Array.from(selectedKeys).length > 0 ? (
            <>
              You have selected:{" "}
              <strong>{Array.from(selectedKeys).join(", ")}</strong>
            </>
          ) : (
            "You have not selected anything."
          )}
        </Description>
      </>
    );
  },
};

export const DragAndDrop: Story = {
  render: function Render() {
    const movies = [
      {
        id: "1",
        name: "The Matrix",
        genre: "Sci-Fi",
        releaseYear: 1999,
        director: "Wachowskis",
        rating: 8.7,
      },
      {
        id: "2",
        name: "Inception",
        genre: "Sci-Fi",
        releaseYear: 2010,
        director: "Christopher Nolan",
        rating: 8.8,
      },
      {
        id: "3",
        name: "The Godfather",
        genre: "Crime",
        releaseYear: 1972,
        director: "Francis Ford Coppola",
        rating: 9.2,
      },
      {
        id: "4",
        name: "Pulp Fiction",
        genre: "Crime",
        releaseYear: 1994,
        director: "Quentin Tarantino",
        rating: 8.9,
      },
      {
        id: "5",
        name: "The Dark Knight",
        genre: "Action",
        releaseYear: 2008,
        director: "Christopher Nolan",
        rating: 9.0,
      },
      {
        id: "6",
        name: "Fight Club",
        genre: "Drama",
        releaseYear: 1999,
        director: "David Fincher",
        rating: 8.8,
      },
      {
        id: "7",
        name: "Forrest Gump",
        genre: "Drama",
        releaseYear: 1994,
        director: "Robert Zemeckis",
        rating: 8.8,
      },
    ];

    const list = useListData({
      initialItems: movies,
    });

    const { dragAndDropHooks } = useDragAndDrop({
      getItems: (keys) =>
        [...keys].map((key) => ({
          "text/plain": list.getItem(key)?.name ?? "",
        })),
      onReorder(e) {
        if (e.target.dropPosition === "before") {
          list.moveBefore(e.target.key, e.keys);
        } else if (e.target.dropPosition === "after") {
          list.moveAfter(e.target.key, e.keys);
        }
      },
    });

    return (
      <Card className="w-[650px]">
        <Table
          aria-label="Movies"
          selectionMode="multiple"
          dragAndDropHooks={dragAndDropHooks}>
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn isRowHeader>Name</TableColumn>
            <TableColumn>Genre</TableColumn>
            <TableColumn>Release</TableColumn>
            <TableColumn>Rating</TableColumn>
          </TableHeader>
          <TableBody items={list.items}>
            {(item) => (
              <TableRow>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.genre}</TableCell>
                <TableCell>{item.releaseYear}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-2">
                    <Star className="size-3.5 fill-current text-warning" />{" "}
                    <span>{item.rating}</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    );
  },
};

interface FilmsResponse {
  results: Character[];
}

interface Character {
  title: string;
  director: number;
  producer: number;
  release_date: number;
}

export const Sorting: Story = {
  render: function Render() {
    const list = useAsyncList<Character>({
      async load({ signal }) {
        const res = await fetch("https://swapi.py4e.com/api/films", {
          signal,
        });
        const json = (await res.json()) as FilmsResponse;
        return {
          items: json.results,
        };
      },
      sort({ items, sortDescriptor }) {
        return {
          items: items.toSorted((a, b) => {
            const column = sortDescriptor.column as keyof Character;
            const first = a[column];
            const second = b[column];
            const firstValue =
              typeof first === "string" ? first : first.toString();
            const secondValue =
              typeof second === "string" ? second : second.toString();
            let cmp = firstValue.localeCompare(secondValue);
            if (sortDescriptor.direction === "descending") {
              cmp *= -1;
            }
            return cmp;
          }),
        };
      },
    });

    return (
      <Card className="w-full">
        <Table
          aria-label="Movies"
          selectionMode="multiple"
          sortDescriptor={list.sortDescriptor}
          onSortChange={(descriptor) => list.sort(descriptor)}>
          <TableHeader>
            <TableColumn id="title" isRowHeader>
              Title
            </TableColumn>
            <TableColumn id="director" allowsSorting>
              Director
            </TableColumn>
            <TableColumn id="producer">Producer</TableColumn>
            <TableColumn id="release_date" allowsSorting>
              Release Date
            </TableColumn>
          </TableHeader>
          <TableBody
            items={list.items}
            renderEmptyState={() => (
              <div className="grid place-content-center p-10">
                <Loader className="animate-spin" />
              </div>
            )}>
            {(item) => (
              <TableRow id={item.title}>
                <TableCell className="whitespace-nowrap">
                  {item.title}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.director}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.producer}
                </TableCell>
                <TableCell>{item.release_date}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    );
  },
};

export const Resizable: Story = {
  render: function Render() {
    const items = [
      {
        id: 1,
        name: "Randy Blythe",
        email: "randy.blythe@example.com",
        age: 52,
        role: "Vocalist",
        band: "Lamb of God",
        status: "Active",
      },
      {
        id: 2,
        name: "Phil Anselmo",
        email: "phil.anselmo@example.com",
        age: 55,
        role: "Vocalist",
        band: "Pantera",
        status: "Active",
      },
      {
        id: 3,
        name: "George Fisher",
        email: "george.fisher@example.com",
        age: 53,
        role: "Vocalist",
        band: "Cannibal Corpse",
        status: "Active",
      },
      {
        id: 4,
        name: "Corey Taylor",
        email: "corey.taylor@example.com",
        age: 50,
        role: "Vocalist",
        band: "Slipknot",
        status: "Active",
      },
      {
        id: 5,
        name: "Trevor Strnad",
        email: "trevor.strnad@example.com",
        age: 41,
        role: "Vocalist",
        band: "The Black Dahlia Murder",
        status: "Inactive",
      },
      {
        id: 6,
        name: "Chuck Schuldiner",
        email: "chuck.schuldiner@example.com",
        age: 34,
        role: "Vocalist",
        band: "Death",
        status: "Deceased",
      },
      {
        id: 7,
        name: "Mitch Lucker",
        email: "mitch.lucker@example.com",
        age: 28,
        role: "Vocalist",
        band: "Suicide Silence",
        status: "Deceased",
      },
    ];
    return (
      <Card className="w-[850px]">
        <Table allowResize aria-label="Vocalists">
          <TableHeader>
            <TableColumn className="max-w-0">ID</TableColumn>
            <TableColumn isRowHeader isResizable>
              Name
            </TableColumn>
            <TableColumn isResizable>Email</TableColumn>
            <TableColumn>Age</TableColumn>
            <TableColumn>Role</TableColumn>
            <TableColumn isResizable>Band</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow id={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.band}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    );
  },
};

export const Href: Story = {
  render: function Render() {
    const items = [
      {
        id: 1,
        name: "Randy Blythe",
        email: "randy.blythe@example.com",
        age: 52,
        role: "Vocalist",
        band: "Lamb of God",
        status: "Active",
      },
      {
        id: 2,
        name: "Phil Anselmo",
        email: "phil.anselmo@example.com",
        age: 55,
        role: "Vocalist",
        band: "Pantera",
        status: "Active",
      },
      {
        id: 3,
        name: "George Fisher",
        email: "george.fisher@example.com",
        age: 53,
        role: "Vocalist",
        band: "Cannibal Corpse",
        status: "Active",
      },
      {
        id: 4,
        name: "Corey Taylor",
        email: "corey.taylor@example.com",
        age: 50,
        role: "Vocalist",
        band: "Slipknot",
        status: "Active",
      },
      {
        id: 5,
        name: "Trevor Strnad",
        email: "trevor.strnad@example.com",
        age: 41,
        role: "Vocalist",
        band: "The Black Dahlia Murder",
        status: "Inactive",
      },
      {
        id: 6,
        name: "Chuck Schuldiner",
        email: "chuck.schuldiner@example.com",
        age: 34,
        role: "Vocalist",
        band: "Death",
        status: "Deceased",
      },
      {
        id: 7,
        name: "Mitch Lucker",
        email: "mitch.lucker@example.com",
        age: 28,
        role: "Vocalist",
        band: "Suicide Silence",
        status: "Deceased",
      },
    ];
    return (
      <Card className="w-[850px]">
        <Table aria-label="Vocalists">
          <TableHeader>
            <TableColumn className="max-w-0">ID</TableColumn>
            <TableColumn isRowHeader>Name</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Age</TableColumn>
            <TableColumn>Role</TableColumn>
            <TableColumn>Band</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow id={item.id} href="https://example.com" target="_blank">
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.band}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    );
  },
};
