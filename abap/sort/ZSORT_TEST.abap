*&---------------------------------------------------------------------*
*& Report ZSORT_TEST
*&---------------------------------------------------------------------*
*&
*&---------------------------------------------------------------------*
REPORT zsort_test.

DATA(lt_test_data) = zcl_sort_helper=>generate_data( 50000 ).

zcl_sort_helper=>start_measure( ).
DATA(lt_bubble) = zcl_bubblesort=>sort( lt_test_data ).
WRITE: / 'Bubble Sort duration:' , zcl_sort_helper=>stop( ).

zcl_sort_helper=>start_measure( ).
DATA(lt_hashsort) = zcl_hashsort=>sort( lt_test_data ).
WRITE: / 'Hash Sort duration:' , zcl_sort_helper=>stop( ).

zcl_sort_helper=>start_measure( ).
DATA(lt_heapsort) = zcl_hashsort=>sort( lt_test_data ).
WRITE: / 'Heap Sort duration:' , zcl_sort_helper=>stop( ).

zcl_sort_helper=>start_measure( ).
DATA(lt_insertsort) = zcl_insertsort=>sort( lt_test_data ).
WRITE: / 'Insert Sort duration:' , zcl_sort_helper=>stop( ).

zcl_sort_helper=>start_measure( ).
DATA(lt_mergesort) = zcl_mergesort=>sort( lt_test_data ).
WRITE: / 'Merge Sort duration:' , zcl_sort_helper=>stop( ).

zcl_sort_helper=>start_measure( ).
DATA(lt_quicksort) = zcl_quicksort=>sort( lt_test_data ).
WRITE: / 'Quick Sort duration:' , zcl_sort_helper=>stop( ).

zcl_sort_helper=>start_measure( ).
DATA(lt_selectsort) = zcl_selectsort=>sort( lt_test_data ).
WRITE: / 'Select Sort duration:' , zcl_sort_helper=>stop( ).

zcl_sort_helper=>start_measure( ).
DATA(lt_shellsort) = zcl_shellsort=>sort( lt_test_data ).
WRITE: / 'Shell Sort duration:' , zcl_sort_helper=>stop( ).

zcl_sort_helper=>start_measure( ).
DATA(lt_sort_keyword) = zcl_sort_via_keyword=>sort( lt_test_data ).
WRITE: / 'ABAP Sort keyword duration:' , zcl_sort_helper=>stop( ).

zcl_sort_helper=>start_measure( ).
DATA(lt_sort_table) = zcl_abap_sorttable=>sort( lt_test_data ).
WRITE: / 'ABAP Sorted table duration:' , zcl_sort_helper=>stop( ).
ASSERT lt_bubble = lt_hashsort.
ASSERT lt_hashsort = lt_heapsort.
ASSERT lt_heapsort = lt_insertsort.
ASSERT lt_insertsort = lt_mergesort.
ASSERT lt_mergesort = lt_quicksort.
ASSERT lt_quicksort = lt_selectsort.
ASSERT lt_shellsort = lt_selectsort.
ASSERT lt_sort_keyword = lt_shellsort.
ASSERT lt_sort_table = lt_sort_keyword.
WRITE: / 'ok'.