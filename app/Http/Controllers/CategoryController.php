<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::orderBy('id', 'desc')->paginate(2);
        return response()->json([
            'categories' => $categories,
            'status_code' => 200
        ], 200);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg'
        ]);

        $category = new Category();
        $category->name = $request->name;
        $path = $request->file('image')->store('categories');
        $category->image = $path;
        if ($category->save()){
            return response()->json($category, 201);
        }else{
            return response()->json($category, 500);
        }
    }


    public function show(Category $category)
    {
        //
    }


    public function edit(Category $category)
    {
        //
    }


    public function update(Request $request, Category $category)
    {
        $this->validate($request, [
            'name' => 'required',
        ]);
        if ($request->hasFile('image'))
       {
           $this->validate($request, [
               'image' => 'required|image|mimes:jpeg,png,jpg'
           ]);
           Storage::delete($category->image);
           $path = $request->file('image')->store('categories');
       }else{
            $path = $category->image;
        }
        $category->name = $request->name;
        $category->image = $path;
        if ($category->save()){
            return response()->json($category, 200);
        }else{
            return response()->json($category, 500);
        }

    }


    public function destroy(Category $category)
    {
        if ($category)
        {
            Storage::delete($category->image);
            $category->delete();
            return response()->json([
                'message' => 'Category deleted success',
                'status_code' => 200
            ], 200);
        }else{
            return response()->json([
                'message' => 'Category Not Found',
                'status_code' => 404
            ], 404);
        }

    }
}
